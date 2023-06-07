import './style.css'
import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BloomEffect, EffectComposer, EffectPass, PixelationEffect, RenderPass } from "postprocessing";

const fov: number = 90;
const aspectRatio: number = window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild(renderer.domElement);

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
composer.addPass(new EffectPass(camera, new BloomEffect({ luminanceThreshold: 0, luminanceSmoothing: 1, intensity: 5 })));
composer.addPass(new EffectPass(camera, new PixelationEffect(10)))

const loader: GLTFLoader = new GLTFLoader();

let rubber_duck: any;
loader.load( '/rubber_duck/scene.gltf', function ( gltf ) {
  rubber_duck = gltf;

  rubber_duck.scene.scale.set(5, 5, 5)
  rubber_duck.scene.position.y = -1;

	scene.add( gltf.scene );
}, undefined, function ( error ) {
	console.error( error );
} );

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 5;

function animate() {
	requestAnimationFrame(animate);

  if (rubber_duck) {
    rubber_duck.scene.rotation.y += 0.01;
    rubber_duck.scene.rotation.x += 0.05;
    rubber_duck.scene.rotation.z += 0.05;
  }

	composer.render();
}

animate();