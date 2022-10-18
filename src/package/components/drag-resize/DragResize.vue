<template>
  <div class="vdr"
       :style="positionStyle"
       :class="`${(active || isActive) ? 'active' : 'inactive'} ${contentClass ? contentClass: ''}`"
       @mousedown="bodyDown($event)"
       @mouseup="up"
       ref="container"
       tabindex="0">
    <div :style="sizeStyle" class="content-container" ref="container2">
      <slot></slot>
    </div>
    <div
        v-for="stick in sticks"
        class="vdr-stick"
        :class="['vdr-stick-' + stick, isResizable ? '' : 'not-resizable']"
        @mousedown.stop.prevent="stickDown(stick, $event)"
        :style="vdrStick(stick)">
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "PsrVue3DragResize"
}
</script>
<script setup lang="ts">
import {computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, PropType, ref, watch} from "vue";
import {addEvents, removeEvents} from "../../utils";
import {Limit, LimitRange, StickType} from "../../types";

const props = defineProps({
  stickSize: {
    type: Number, default: 8,
  },
  parentScaleX: {
    type: Number, default: 1,
  },
  parentScaleY: {
    type: Number, default: 1,
  },
  isActive: {
    type: Boolean, default: false,
  },
  preventActiveBehavior: {
    type: Boolean, default: false,
  },
  isDraggable: {
    type: Boolean, default: true,
  },
  isResizable: {
    type: Boolean, default: true,
  },
  aspectRatio: {
    type: Boolean, default: false,
  },
  parentLimitation: {
    type: Boolean, default: false,
  },
  snapToGrid: {
    type: Boolean, default: false,
  },
  gridX: {
    type: Number,
    default: 50,
    validator(val: number) {
      return val >= 0;
    },
  },
  gridY: {
    type: Number,
    default: 50,
    validator(val: number) {
      return val >= 0;
    },
  },
  parentW: {
    type: Number,
    default: 0,
    validator(val: number) {
      return val >= 0;
    },
  },
  parentH: {
    type: Number,
    default: 0,
    validator(val: number) {
      return val >= 0;
    },
  },
  w: {
    type: Number,
    default: 200,
    validator(val: number) {
      return val >= 0;
    },
  },
  h: {
    type: Number,
    default: 200,
    validator(val: number) {
      return val >= 0;
    },
  },
  minw: {
    type: Number,
    default: 50,
    validator(val: number) {
      return val >= 0;
    },
  },
  minh: {
    type: Number,
    default: 50,
    validator(val: number) {
      return val >= 0;
    },
  },
  x: {
    type: Number,
    default: 0,
    validator(val) {
      return typeof val === 'number';
    },
  },
  y: {
    type: Number,
    default: 0,
    validator(val) {
      return typeof val === 'number';
    },
  },
  z: {
    type: Number,
    default: 0,
    validator(val: string | number) {
      return val >= 0;
    },
  },
  dragHandle: {
    type: String,
    default: null,
  },
  dragCancel: {
    type: String,
    default: null,
  },
  sticks: {
    type: Array as PropType<StickType[]>,
    default() {
      return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'];
    },
  },
  axis: {
    type: String,
    default: 'both',
    validator(val: string) {
      return ['x', 'y', 'both', 'none'].indexOf(val) !== -1;
    },
  },
  contentClass: {
    type: String,
    required: false,
    default: '',
  },
})
const emits = defineEmits<{
  (e: 'clicked', value: any): void
  (e: 'dragging', value: any): void
  (e: 'dragstop', value: any): void
  (e: 'resizing', value: any): void
  (e: 'resizestop', value: any): void
  (e: 'activated'): void
  (e: 'deactivated'): void
}>()

const container = ref<HTMLDivElement>()
const container2 = ref<HTMLDivElement>()

const styleMapping: any = {
  y: {
    t: 'top',
    m: 'marginTop',
    b: 'bottom',
  },
  x: {
    l: 'left',
    m: 'marginLeft',
    r: 'right',
  },
};

const fixAspectRatio = ref()
const active = ref(false)
const zIndex = ref()
const parentWidth = ref()
const parentHeight = ref()
const left = ref()
const top = ref()
const right = ref()
const bottom = ref()
const minHeight = ref()

const stickDrag = ref(false)
const bodyDrag = ref(false)
const dimensionsBeforeMove = ref({pointerX: 0, pointerY: 0, x: 0, y: 0, w: 0, h: 0, left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0});
const limits = ref<Limit>({
  left: {min: null, max: null},
  right: {min: null, max: null},
  top: {min: null, max: null},
  bottom: {min: null, max: null},
});
const currentStick = ref<StickType>();
const aspectFactor = ref(1)

const domEvents = new Map([
  ['mousemove', move],
  ['mouseup', up],
  ['mouseleave', up],
  ['mousedown', deselect],
  ['touchmove', move],
  ['touchend', up],
  ['touchcancel', up],
  ['touchstart', up],
]);
const uid = getCurrentInstance()?.uid + ''

const positionStyle = computed(() => {
  return {
    top: top.value + 'px',
    left: left.value + 'px',
    zIndex: zIndex.value,
  };
})

const width = computed(() => {
  return parentWidth.value - left.value - right.value;
})

const height = computed(() => {
  return parentHeight.value - top.value - bottom.value;
})

const sizeStyle = computed(() => {
  return {
    width: width.value + 'px',
    height: height.value + 'px'
  };
})

const rect = computed(() => {
  return {
    left: Math.round(left.value),
    top: Math.round(top.value),
    width: Math.round(width.value),
    height: Math.round(height.value),
  };
})

watch(active, isActive => {
  if (isActive) {
    emits('activated');
  } else {
    emits('deactivated');
  }
})
watch(() => props.isActive, isActive => {
  active.value = isActive
}, {immediate: true})
watch(() => props.z, z => {
  if (z >= 0) {
    zIndex.value = z;
  }
}, {immediate: true})
watch(() => props.x, (newVal, oldVal) => {
  if (stickDrag.value || bodyDrag.value || (newVal === left.value) || oldVal === undefined) {
    return;
  }
  const delta = oldVal - newVal;
  bodyDown({pageX: left.value, pageY: top.value} as any);
  bodyMove({x: delta, y: 0});
  nextTick(() => {
    bodyUp();
  });
}, {immediate: true})

watch(() => props.y, (newVal, oldVal) => {
  if (stickDrag.value || bodyDrag.value || (newVal === top.value) || oldVal === undefined) {
    return;
  }
  const delta = oldVal - newVal;
  bodyDown({pageX: left.value, pageY: top.value} as any);
  bodyMove({x: 0, y: delta});
  nextTick(() => {
    bodyUp();
  });
}, {immediate: true})

watch(() => props.w, (newVal, oldVal) => {
  if (stickDrag.value || bodyDrag.value || (newVal === width.value) || oldVal === undefined) {
    return;
  }
  const stick = 'mr';
  const delta = oldVal - newVal;
  stickDown(stick, {pageX: right.value, pageY: top.value + (height.value / 2)} as any, true);
  stickMove({x: delta, y: 0});

  nextTick(() => {
    stickUp();
  });
}, {immediate: true})
watch(() => props.h, (newVal, oldVal) => {
  if (stickDrag.value || bodyDrag.value || (newVal === height.value) || oldVal === undefined) {
    return;
  }
  const stick = 'bm';
  const delta = oldVal - newVal;
  stickDown(stick, {pageX: left.value + (width.value / 2), pageY: bottom.value} as any, true);
  stickMove({x: 0, y: delta});

  nextTick(() => {
    stickUp();
  });
}, {immediate: true})
watch(() => props.parentW, val => {
  right.value = val - width.value - left.value;
  parentWidth.value = val;
})
watch(() => props.parentH, val => {
  bottom.value = val - height.value - top.value;
  parentHeight.value = val;
})
onMounted(() => {
  const parentElement = container.value!.parentElement
  parentWidth.value = props.parentW ? props.parentW : parentElement!.clientWidth;
  parentHeight.value = props.parentH ? props.parentH : parentElement!.clientHeight;

  left.value = props.x;
  top.value = props.y;
  right.value = parentWidth.value - props.w - left.value;
  bottom.value = parentHeight.value - props.h - top.value;

  addEvents(domEvents);

  if (props.dragHandle) {
    container.value!.querySelectorAll(props.dragHandle).forEach((dragHandle) => {
      dragHandle.setAttribute('data-drag-handle', uid);
    });
  }

  if (props.dragCancel) {
    container.value!.querySelectorAll(props.dragCancel).forEach((cancelHandle) => {
      cancelHandle.setAttribute('data-drag-cancel', uid);
    });
  }
})

onBeforeUnmount(() => {
  removeEvents(domEvents);
})

function vdrStick(stick: StickType) {
  const stickStyle: any = {
    width: `${props.stickSize / props.parentScaleX}px`,
    height: `${props.stickSize / props.parentScaleY}px`,
  };
  stickStyle[styleMapping.y[stick[0]]] = `${props.stickSize / props.parentScaleX / -2}px`;
  stickStyle[styleMapping.x[stick[1]]] = `${props.stickSize / props.parentScaleX / -2}px`;
  return stickStyle;
}

function deselect() {
  if (props.preventActiveBehavior) {
    return;
  }
  active.value = false;
}

function move(ev: MouseEvent) {
  if (!stickDrag.value && !bodyDrag.value) {
    return;
  }

  ev.stopPropagation();

  const pageX = ev.pageX;
  const pageY = ev.pageY;

  const delta = {
    x: (dimensionsBeforeMove.value.pointerX - pageX) / props.parentScaleX,
    y: (dimensionsBeforeMove.value.pointerY - pageY) / props.parentScaleY,
  };

  if (stickDrag.value) {
    stickMove(delta);
  }

  if (bodyDrag.value) {
    if (props.axis === 'x') {
      delta.y = 0;
    } else if (props.axis === 'y') {
      delta.x = 0;
    } else if (props.axis === 'none') {
      return;
    }
    bodyMove(delta);
  }
}

function up() {
  if (stickDrag.value) {
    stickUp();
  } else if (bodyDrag.value) {
    bodyUp();
  }
}

function bodyDown(ev: MouseEvent) {
  const button = ev.button;
  const target = ev.target as Element
  if (!props.preventActiveBehavior) {
    active.value = true;
  }

  if (button && button !== 0) {
    return;
  }

  emits('clicked', ev);

  if (!active.value) {
    return;
  }

  if (props.dragHandle && target.getAttribute('data-drag-handle') !== uid) {
    return;
  }

  if (props.dragCancel && target!.getAttribute('data-drag-cancel') === uid) {
    return;
  }

  if (typeof ev.stopPropagation !== 'undefined') {
    ev.stopPropagation();
  }

  if (typeof ev.preventDefault !== 'undefined') {
    ev.preventDefault();
  }

  if (props.isDraggable) {
    bodyDrag.value = true;
  }

  const pointerX = ev.pageX;
  const pointerY = ev.pageY;

  saveDimensionsBeforeMove({pointerX, pointerY});

  if (props.parentLimitation) {
    limits.value = calcDragLimitation();
  }else{
    limits.value = {
      left: {min: null, max: null},
      right: {min: null, max: null},
      top: {min: null, max: null},
      bottom: {min: null, max: null},
    }
  }
}

function bodyMove(delta: { x: number, y: number }) {

  let newTop = dimensionsBeforeMove.value.top - delta.y;
  let newBottom = dimensionsBeforeMove.value.bottom + delta.y;
  let newLeft = dimensionsBeforeMove.value.left - delta.x;
  let newRight = dimensionsBeforeMove.value.right + delta.x;

  if (props.snapToGrid) {
    let alignTop = true;
    let alignLeft = true;

    let diffT = newTop - Math.floor(newTop / props.gridY) * props.gridY;
    let diffB = (parentHeight.value - newBottom) - Math.floor((parentHeight.value - newBottom) / props.gridY) * props.gridY;
    let diffL = newLeft - Math.floor(newLeft / props.gridX) * props.gridX;
    let diffR = (parentWidth.value - newRight) - Math.floor((parentWidth.value - newRight) / props.gridX) * props.gridX;

    if (diffT > (props.gridY / 2)) {
      diffT -= props.gridY;
    }
    if (diffB > (props.gridY / 2)) {
      diffB -= props.gridY;
    }
    if (diffL > (props.gridX / 2)) {
      diffL -= props.gridX;
    }
    if (diffR > (props.gridX / 2)) {
      diffR -= props.gridX;
    }

    if (Math.abs(diffB) < Math.abs(diffT)) {
      alignTop = false;
    }
    if (Math.abs(diffR) < Math.abs(diffL)) {
      alignLeft = false;
    }

    newTop -= (alignTop ? diffT : diffB);
    newBottom = parentHeight.value - height.value - newTop;
    newLeft -= (alignLeft ? diffL : diffR);
    newRight = parentWidth.value - width.value - newLeft;
  }

  ({
    newLeft: left.value,
    newRight: right.value,
    newTop: top.value,
    newBottom: bottom.value,
  } = rectCorrectionByLimit({newLeft, newRight, newTop, newBottom}));

  emits('dragging', rect.value);
}

function bodyUp() {
  bodyDrag.value = false;
  emits('dragging', rect.value);
  emits('dragstop', rect.value);

  dimensionsBeforeMove.value = {pointerX: 0, pointerY: 0, x: 0, y: 0, w: 0, h: 0, left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0};

  limits.value = {
    left: {min: null, max: null},
    right: {min: null, max: null},
    top: {min: null, max: null},
    bottom: {min: null, max: null},
  };
}

function stickDown(stick: StickType, ev: MouseEvent, force = false) {
  if ((!props.isResizable || !active.value) && !force) {
    return;
  }

  stickDrag.value = true;

  const pointerX = ev.pageX;
  const pointerY = ev.pageY;

  saveDimensionsBeforeMove({pointerX, pointerY});

  currentStick.value = stick;

  limits.value = calcResizeLimits();
}

function saveDimensionsBeforeMove({pointerX, pointerY}: { pointerX: number, pointerY: number }) {
  dimensionsBeforeMove.value.pointerX = pointerX;
  dimensionsBeforeMove.value.pointerY = pointerY;

  dimensionsBeforeMove.value.left = left.value;
  dimensionsBeforeMove.value.right = right.value;
  dimensionsBeforeMove.value.top = top.value;
  dimensionsBeforeMove.value.bottom = bottom.value;

  dimensionsBeforeMove.value.width = width.value;
  dimensionsBeforeMove.value.height = height.value;

  aspectFactor.value = width.value / height.value;
}

function stickMove(delta: { x: number, y: number }) {
  let newTop = dimensionsBeforeMove.value.top;
  let newBottom = dimensionsBeforeMove.value.bottom;
  let newLeft = dimensionsBeforeMove.value.left;
  let newRight = dimensionsBeforeMove.value.right;

  if (currentStick.value) {
    switch (currentStick.value[0]) {
      case 'b':
        newBottom = dimensionsBeforeMove.value.bottom + delta.y;

        if (props.snapToGrid) {
          newBottom = parentHeight.value - Math.round((parentHeight.value - newBottom) / props.gridY) * props.gridY;
        }

        break;

      case 't':
        newTop = dimensionsBeforeMove.value.top - delta.y;

        if (props.snapToGrid) {
          newTop = Math.round(newTop / props.gridY) * props.gridY;
        }

        break;
      default:
        break;
    }

    switch (currentStick.value[1]) {
      case 'r':
        newRight = dimensionsBeforeMove.value.right + delta.x;

        if (props.snapToGrid) {
          newRight = parentWidth.value - Math.round((parentWidth.value - newRight) / props.gridX) * props.gridX;
        }

        break;

      case 'l':
        newLeft = dimensionsBeforeMove.value.left - delta.x;

        if (props.snapToGrid) {
          newLeft = Math.round(newLeft / props.gridX) * props.gridX;
        }

        break;
      default:
        break;
    }

    ({
      newLeft,
      newRight,
      newTop,
      newBottom,
    } = rectCorrectionByLimit({newLeft, newRight, newTop, newBottom}));

    if (props.aspectRatio) {
      ({
        newLeft,
        newRight,
        newTop,
        newBottom,
      } = rectCorrectionByAspectRatio({newLeft, newRight, newTop, newBottom}));
    }

    left.value = newLeft;
    right.value = newRight;
    top.value = newTop;
    bottom.value = newBottom;

    emits('resizing', rect.value);
  }
}

function stickUp() {
  stickDrag.value = false;
  dimensionsBeforeMove.value = {pointerX: 0, pointerY: 0, x: 0, y: 0, w: 0, h: 0, left: 0, right: 0, top: 0, bottom: 0, width: 0, height: 0};
  limits.value = {
    left: {min: 0, max: 0},
    right: {min: 0, max: 0},
    top: {min: 0, max: 0},
    bottom: {min: 0, max: 0},
  };

  emits('resizing', rect.value);
  emits('resizestop', rect.value);
}

function calcDragLimitation() {
  return {
    left: {min: 0, max: parentWidth.value - width.value},
    right: {min: 0, max: parentWidth.value - width.value},
    top: {min: 0, max: parentHeight.value - height.value},
    bottom: {min: 0, max: parentHeight.value - height.value},
  };
}

function calcResizeLimits() {
  let {minh: minHeight, minw: minWidth} = props;

  const parentLim = props.parentLimitation ? 0 : null;

  if (props.aspectRatio) {
    if (minWidth / minHeight > aspectFactor.value) {
      minHeight = minWidth / aspectFactor.value;
    } else {
      minWidth = aspectFactor.value * minHeight;
    }
  }

  const limits = {
    left: {min: parentLim, max: left.value + (width.value - minWidth)},
    right: {min: parentLim, max: right.value + (width.value - minWidth)},
    top: {min: parentLim, max: top.value + (height.value - minHeight)},
    bottom: {min: parentLim, max: bottom.value + (height.value - minHeight)},
  };

  if (props.aspectRatio) {
    const aspectLimits = {
      left: {
        min: left.value - (Math.min(top.value, bottom.value) * aspectFactor.value) * 2,
        max: left.value + ((((height.value - minHeight) / 2) * aspectFactor.value) * 2),
      },
      right: {
        min: right.value - (Math.min(top.value, bottom.value) * aspectFactor.value) * 2,
        max: right.value + ((((height.value - minHeight) / 2) * aspectFactor.value) * 2),
      },
      top: {
        min: top.value - (Math.min(left.value, right.value) / aspectFactor.value) * 2,
        max: top.value + ((((width.value - minWidth) / 2) / aspectFactor.value) * 2),
      },
      bottom: {
        min: bottom.value - (Math.min(left.value, right.value) / aspectFactor.value) * 2,
        max: bottom.value + ((((width.value - minWidth) / 2) / aspectFactor.value) * 2),
      },
    };

    if (currentStick.value![0] === 'm') {
      limits.left = {
        min: Math.max(limits.left.min || 0, aspectLimits.left.min),
        max: Math.min(limits.left.max, aspectLimits.left.max),
      };
      limits.right = {
        min: Math.max(limits.right.min || 0, aspectLimits.right.min),
        max: Math.min(limits.right.max, aspectLimits.right.max),
      };

    } else if (currentStick.value![1] === 'm') {
      limits.top = {
        min: Math.max(limits.top.min || 0, aspectLimits.top.min),
        max: Math.min(limits.top.max, aspectLimits.top.max),
      };
      limits.bottom = {
        min: Math.max(limits.bottom.min || 0, aspectLimits.bottom.min),
        max: Math.min(limits.bottom.max, aspectLimits.bottom.max),
      };
    }
  }

  return limits;
}

function sideCorrectionByLimit(limit: LimitRange, current: number) {
  let value = current;

  if (limit.min !== null && current < limit.min) {
    value = limit.min;
  } else if (limit.max !== null && limit.max < current) {
    value = limit.max;
  }

  return value;
}

function rectCorrectionByLimit(rect: { newRight: number, newLeft: number, newBottom: number, newTop: number }) {
  let {newRight, newLeft, newBottom, newTop} = rect;

  newLeft = sideCorrectionByLimit(limits.value.left, newLeft);
  newRight = sideCorrectionByLimit(limits.value.right, newRight);
  newTop = sideCorrectionByLimit(limits.value.top, newTop);
  newBottom = sideCorrectionByLimit(limits.value.bottom, newBottom);

  return {
    newLeft,
    newRight,
    newTop,
    newBottom,
  };
}

function rectCorrectionByAspectRatio(rect: { newRight: number, newLeft: number, newBottom: number, newTop: number }) {
  let {newLeft, newRight, newTop, newBottom} = rect;

  let newWidth = parentWidth.value - newLeft - newRight;
  let newHeight = parentHeight.value - newTop - newBottom;

  if (currentStick.value![1] === 'm') {
    const deltaHeight = newHeight - dimensionsBeforeMove.value.height;

    newLeft -= (deltaHeight * aspectFactor.value) / 2;
    newRight -= (deltaHeight * aspectFactor.value) / 2;
  } else if (currentStick.value![0] === 'm') {
    const deltaWidth = newWidth - dimensionsBeforeMove.value.width;

    newTop -= (deltaWidth / aspectFactor.value) / 2;
    newBottom -= (deltaWidth / aspectFactor.value) / 2;
  } else if (newWidth / newHeight > aspectFactor.value) {
    newWidth = aspectFactor.value * newHeight;

    if (currentStick.value![1] === 'l') {
      newLeft = parentWidth.value - newRight - newWidth;
    } else {
      newRight = parentWidth.value - newLeft - newWidth;
    }
  } else {
    newHeight = newWidth / aspectFactor.value;

    if (currentStick.value![0] === 't') {
      newTop = parentHeight.value - newBottom - newHeight;
    } else {
      newBottom = parentHeight.value - newTop - newHeight;
    }
  }

  return {newLeft, newRight, newTop, newBottom};
}

</script>

<style scoped>
.vdr {
  position: absolute;
  box-sizing: border-box;

}

.vdr.active:before {
  content: '';
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  outline: 1px dashed #d6d6d6;
}

.vdr-stick {
  box-sizing: border-box;
  position: absolute;
  font-size: 1px;
  background: #ffffff;
  border: 1px solid #6c6c6c;
  box-shadow: 0 0 2px #bbb;
}

.inactive .vdr-stick {
  display: none;
}

.vdr-stick-tl, .vdr-stick-br {
  cursor: nwse-resize;
}

.vdr-stick-tm, .vdr-stick-bm {
  left: 50%;
  cursor: ns-resize;
}

.vdr-stick-tr, .vdr-stick-bl {
  cursor: nesw-resize;
}

.vdr-stick-ml, .vdr-stick-mr {
  top: 50%;
  cursor: ew-resize;
}

.vdr-stick.not-resizable {
  display: none;
}

.content-container {
  display: block;
  position: relative;
}
</style>