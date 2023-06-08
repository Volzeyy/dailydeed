import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import {
  EffectComposer,
  EffectPass,
  PixelationEffect,
  RenderPass,
} from "postprocessing";

let tiles: any = [
  [{}, {}, {}],
  [{}, {}, {}],
  [{}, {}, {}]
];

const loader = new GLTFLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  90,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
composer.addPass(new EffectPass(camera, new PixelationEffect(0)));
const controls = new OrbitControls(camera, renderer.domElement);

for (let rowIndex: number = 0; rowIndex < tiles.length; rowIndex++) {
  for (
    let tileIndex: number = 0;
    tileIndex < tiles[rowIndex].length;
    tileIndex++
  ) {
    loader.load(
      "tesseract_cube/scene.gltf",
      function (gltf) {
        console.log(gltf.scene.scale);

        gltf.scene.scale.set(0.01, 0.01, 0.01);
        gltf.scene.position.x = rowIndex * 2.5;
        gltf.scene.position.z = tileIndex * 2.5;

        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      }
    );
  }
}

camera.position.x = -2.1;
camera.position.y = 3;
camera.position.z = -2.1;

camera.rotation.x = -2.2;
camera.rotation.y = -0.51;
camera.rotation.z = 2.54;

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);

  controls.update();

  composer.render();
}
animate();

const app: HTMLDivElement = document.querySelector("#app")!;

const tiles_length_input: HTMLInputElement = document.createElement("input");
tiles_length_input.id = "tiles_length_input";
tiles_length_input.type = "range";
tiles_length_input.min = "0";
tiles_length_input.max = "100";
tiles_length_input.value = "3";
tiles_length_input.step = "1";

tiles_length_input.addEventListener("change", (e: Event) => {
  scene.clear();
  const light = new THREE.AmbientLight(0xffffff);
  scene.add(light);

  const target = e.target as HTMLInputElement;
  const value: number = Number(target.value);

  tiles = [];

  for (let rowIndex: number = 0; rowIndex < value; rowIndex++) {
    let current_row = [];

    for (let tileIndex: number = 0; tileIndex < value; tileIndex++) {
      current_row.push({});
    }

    tiles.push(current_row);
  }

  for (let rowIndex: number = 0; rowIndex < tiles.length; rowIndex++) {
    for (
      let tileIndex: number = 0;
      tileIndex < tiles[rowIndex].length;
      tileIndex++
    ) {
      loader.load(
        "tesseract_cube/scene.gltf",
        function (gltf) {
          console.log(gltf.scene.scale);

          gltf.scene.scale.set(0.01, 0.01, 0.01);
          gltf.scene.position.x = rowIndex * 2.2;
          gltf.scene.position.z = tileIndex * 2.2;

          scene.add(gltf.scene);
        },
        undefined,
        function (error) {
          console.error(error);
        }
      );
    }
  }
});

app.appendChild(tiles_length_input);
