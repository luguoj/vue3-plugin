<script lang="ts">
export default {
  name: "PsrVue3AMapLayerThreeJs"
}
</script>
<script setup lang="ts">
import {defineExpose, onUnmounted, shallowRef, watch, watchEffect} from "vue";
import * as THREE from "three";

const props = withDefaults(defineProps<{
  aMap?: AMap.Map,
  layerData?: THREE.Object3D[]
  layerOpacity?: number,
  layerZoomMin?: number,
  layerZoomMax?: number,
  layerVisible?: boolean
}>(), {
  layerOpacity: 1,
  layerZoomMin: 2,
  layerZoomMax: 20,
  layerVisible: true
})
const threeJs = shallowRef<AMap.GLCustomLayer>()

// 这里我们的地图模式是 3D，所以创建一个透视相机，相机的参数初始化可以随意设置，因为在 render 函数中，每一帧都需要同步相机参数，因此这里变得不那么重要。
// 如果你需要 2D 地图（viewMode: '2D'），那么你需要创建一个正交相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 1 << 30);

const scene = shallowRef<THREE.Scene>();
// 环境光照和平行光
const aLight = new THREE.AmbientLight(0xffffff, 0.3);
const dLight = new THREE.DirectionalLight(0xffffff, 1);
dLight.position.set(1000, -100, 900);

watchEffect(() => {
  if (props.layerData && props.aMap) {
    const customCoords = (props.aMap as any).customCoords;
    const _scene = new THREE.Scene()
    _scene.add(dLight)
    _scene.add(aLight)
    for (let i = 0; i < props.layerData.length; i++) {
      const d = props.layerData[i].clone();
      const coords = customCoords.lngLatsToCoords([
        [d.position.x, d.position.y]
      ]);
      d.position.set(coords[0][0], coords[0][1], d.position.z);
      _scene.add(d);
    }
    scene.value = _scene;
    (props.aMap as any).render()
  } else {
    scene.value = undefined
  }
})

watch(() => props.aMap, (map) => {
  if (map) {
    // 数据转换工具
    const customCoords = (map as any).customCoords;
    let renderer: THREE.WebGLRenderer
    threeJs.value = new AMap.GLCustomLayer({
      // 图层的层级
      zIndex: 10,
      opacity: props.layerOpacity,
      zooms: [props.layerZoomMin, props.layerZoomMax],
      // 初始化的操作，创建图层过程中执行一次。
      init: (gl) => {
        renderer = new THREE.WebGLRenderer({
          context: gl,  // 地图的 gl 上下文
        });
        // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
        renderer.autoClear = false;
      },
      render: () => {
        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
        renderer.resetState();
        // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
        // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题 todo 处理此步骤反而会到值拖动地图时3D图层错位
        // 不执行此步骤获取摄像机会报错
        customCoords.lngLatsToCoords([[map.getCenter().lng, map.getCenter().lat]]);
        // 获取3D相机
        const {near, far, fov, up, lookAt, position} = customCoords.getCameraParams();
        // 这里的顺序不能颠倒，否则可能会出现绘制卡顿的效果。
        camera.near = near;
        camera.far = far;
        camera.fov = fov;
        camera.position.set(position[0], position[1], position[2]);
        camera.up.set(up[0], up[1], up[2]);
        camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
        camera.updateProjectionMatrix();
        // 重新绘制
        if (scene.value) {
          renderer.render(scene.value, camera);
        }
        // 这里必须执行！！重新设置 three 的 gl 上下文状态。
        renderer.resetState();
      },
    });
    map.addLayer(threeJs.value)
  }
}, {immediate: true})

watchEffect(() => {
  threeJs.value?.setOpacity(props.layerOpacity)
})
watchEffect(() => {
  threeJs.value?.setZooms([props.layerZoomMin, props.layerZoomMax])
})
watch(() => props.layerVisible, visible => {
  if (threeJs.value) {
    if (visible) {
      threeJs.value.show()
    } else {
      threeJs.value.hide()
    }
  }
})
onUnmounted(() => {
  if (threeJs.value && props.aMap) {
    props.aMap.removeLayer(threeJs.value)
    threeJs.value.destroy()
  }
})

defineExpose({
  threeJs
})
</script>
<template>

</template>
<style scoped>

</style>