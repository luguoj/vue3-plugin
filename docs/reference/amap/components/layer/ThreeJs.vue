<script setup lang="ts">
import {PsrAMap, PsrAMapThreeJsLayer, PsrAMapTypes} from "@psr-framework/vue3-plugin";
import {ref} from "vue";
import * as THREE from "three162"
import {GLTFLoader} from "three162/examples/jsm/loaders/GLTFLoader";
import textureUrl from "./texture.png?url"
import modelUrl from "./model.glb?url"
import {PsrThreeDRACOLoader} from "./draco/DracoLoader.ts";

const visible = ref(true)

function handleThreeJsReady(
    {
      customCoords,
      THREE,
      renderContext: {scene},
      render
    }: PsrAMapTypes.ThreeJsLayer.OnReadyParams
) {
  // 数据使用转换工具进行转换，这个操作必须要提前执行（在获取镜头参数 函数之前执行），否则将会获得一个错误信息。
  var data = customCoords().lngLatsToCoords([
    [116.52, 39.79],
    [116.54, 39.79],
    [116.56, 39.79],
  ]);

  var texture = new THREE.TextureLoader().load(textureUrl);
  texture.minFilter = THREE.LinearFilter;
  //  这里可以使用 three 的各种材质
  var mat = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    depthTest: true,
    transparent: true,
    map: texture,
  });
  var geo = new THREE.BoxGeometry(1000, 1000, 1000);
  const meshes: { mesh: THREE.Mesh, count: number }[] = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    var mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(d[0], d[1], 500);
    meshes.push({
      mesh,
      count: 30 * (i + 1),
    });
    scene.add(mesh);
  }

  var dataModel = customCoords().lngLatToCoord(
      [116.54, 39.83],
  );
  const loader = new GLTFLoader();
  const dracoLoader = new PsrThreeDRACOLoader();
  loader.setDRACOLoader(dracoLoader)
  let modelMesh: any
  loader.load(modelUrl, function (gltf) {
    modelMesh = gltf.scene
    modelMesh.position.set(dataModel[0], dataModel[1], 0);
    modelMesh.rotation.set(Math.PI * 0.5, 0, 0)
    modelMesh.scale.set(100, 100, 100)
    scene.add(modelMesh)
  })
  const clock = new THREE.Clock();

  // 动画
  function animate() {
    const delta = clock.getDelta();
    for (let i = 0; i < meshes.length; i++) {
      let {mesh, count} = meshes[i];
      mesh.rotateZ((count / 180) * Math.PI * delta);
    }
    modelMesh?.rotateY((30 / 180) * Math.PI * delta)
    render();
    requestAnimationFrame(animate);
  }

  animate();
}

</script>

<template>
  <div style="height: 400px;">
    <button class="el-button" @click="visible=!visible">开/关点图层: {{ visible }}</button>
    <psr-a-map
        style="height: 100%;"
        :map-zoom="13"
        :map-pitch="50"
        map-view-mode="3D"
        :map-features="['bg','road']"
        :map-center="{lng:116.54, lat:39.81}"
    >
      <template #default="{map}">
        <psr-a-map-three-js-layer
            :a-map="map"
            :layer-zoom-range="[2,26]"
            :layer-visible="visible"
            :layer-z-index="130"
            @three-js-ready="handleThreeJsReady"
        />
      </template>
    </psr-a-map>
  </div>
</template>