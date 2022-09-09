<script setup lang="ts">
import "@pansy/amap-types";
import {PsrVue3AMap, PsrVue3AMapExpose, PsrVue3AMapMarker, PsrVue3AMapMarkerCluster, PsrVue3AMapMarkerClusterExpose} from "./lib";
import {ref} from "vue";
import PsrVue3AMapLayerBuilding from "./lib/components/layer/building/Building.vue";
import PsrVue3AMapInfoWindow from "./lib/components/info-window/InfoWindow.vue";
import * as THREE from "three";
import {BoxGeometry} from "three/src/geometries/BoxGeometry";
import PsrVue3AMapLayerThreeJs from "./lib/components/layer/three-js/ThreeJs.vue";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

const amapKey = `${import.meta.env.VITE_APP_AMAP_KEY}`
const markers = ref([{title: 'test', weight: 1, position: {lng: 117.9749, lat: 24.5932}}])
const markerCluster = ref<AMap.MarkerCluster.DataOptions[]>([
  {weight: 1, lnglat: [117.9749, 24.5932], title: 'origin'},
])
for (let i = 0; i < 100; i++) {
  const element: AMap.MarkerCluster.DataOptions = {weight: 1, lnglat: [117.9749 + Math.random() - 0.5, 24.5932 + Math.random() - 0.5], title: 'title-' + i};
  markerCluster.value.push(element)
}
const visible = ref(true)
const buildingsOn = ref(false)

function handleTest() {
  mapRef.value?.map.setFitView()
}

const mapRef = ref<PsrVue3AMapExpose>()
const markerClusterRef = ref<PsrVue3AMapMarkerClusterExpose>()

const windowOn = ref(true)

var texture = new THREE.TextureLoader().load('https://a.amap.com/jsapi_demos/static/demo-center-v2/three.jpeg');
texture.minFilter = THREE.LinearFilter;
//  这里可以使用 three 的各种材质
var mat = new THREE.MeshPhongMaterial({
  color: 0xfff0f0,
  depthTest: true,
  transparent: true,
  map: texture,
});
const geo = new BoxGeometry(1000, 1000, 1000);
const threeJsData = ref<THREE.Object3D[]>([])
let count = 1

function addBox() {
  count++
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(117.9549 + count * 0.01, 24.5932, 0);
  threeJsData.value.push(mesh)
}

function addModel() {
  count++
  const loader = new GLTFLoader();
  loader.load('asserts/model.gltf', function (gltf) {
    const mesh = gltf.scene
    mesh.position.set(117.9549 + count * 0.01, 24.5932, 0);
    mesh.rotation.set(Math.PI*0.5,0,0)
    mesh.scale.set(0.01,0.01,0.01)
    threeJsData.value.push(mesh)
  })
}
</script>
<template>
  <button @click="handleTest">test</button>
  <button @click="buildingsOn=!buildingsOn">buildings</button>
  <button @click="windowOn=!windowOn">info</button>
  <button @click="markers.splice(markers.length-1)">del</button>
  <button @click="addBox">addbox</button>
  <button @click="addModel">addmodel</button>
  <div class="ct-root">
    <psr-vue3-a-map
        :map-center="{lng:117.9749,lat:24.5932}"
        :map-zoom="18"
        :map-key="amapKey"
        :map-logo="false"
        :map-layer-buildings="true"
        ref="mapRef"
    >
      <template v-slot="{map}">
<!--        <psr-vue3-a-map-marker-->
<!--            v-for="marker in markers" :key="marker.title"-->
<!--            :a-map="map"-->
<!--            :marker-position="marker.position"-->
<!--            :marker-title="marker.title"-->
<!--            :marker-visible="visible"-->
<!--            marker-label="i am label"-->
<!--            marker-label-direction="top"-->
<!--            marker-custom-->
<!--        >-->
<!--          {{ marker.title }}sadfsfaasdfasdf-->
<!--        </psr-vue3-a-map-marker>-->
<!--        <psr-vue3-a-map-marker-cluster-->
<!--            :a-map="map"-->
<!--            :cluster-data="markerCluster"-->
<!--            cluster-custom-marker-->
<!--            ref="markerClusterRef"-->
<!--        >-->
<!--          <template v-slot:marker="{data}"><span>{{ data.title }}</span></template>-->
<!--        </psr-vue3-a-map-marker-cluster>-->
<!--        <psr-vue3-a-map-layer-building buildings-wall-color="rgba(255,0,0,1)" :buildings-visible="buildingsOn" :a-map="map"/>-->
<!--        <psr-vue3-a-map-info-window v-model:info-window-visible="windowOn" :a-map="map" :info-window-position="[117.9749,24.5932]">-->
<!--          <button>asdfasdfadasasdfasdfasdfasdfadfasdfasdfasdfsafsdfa</button>-->
<!--        </psr-vue3-a-map-info-window>-->
<!--        <psr-vue3-a-map-info-window :info-window-visible="!windowOn" :a-map="map" info-window-custom>-->
<!--          1asdfasfdad-->
<!--        </psr-vue3-a-map-info-window>-->
        <psr-vue3-a-map-layer-three-js
            :a-map="map"
            :layer-data="threeJsData"
        />
      </template>
    </psr-vue3-a-map>
  </div>
</template>

<style scoped lang="scss">
.ct-root {
  width: 100%;
  height: 100%;
  border: 1px solid;
}

.map {
  height: 500px;
}
</style>
