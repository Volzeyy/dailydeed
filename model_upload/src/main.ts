import './style.css'
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const loader = new GLTFLoader();

const app: HTMLElement = document.getElementById("app")!;

const input = document.createElement("input");
input.type = "file";
input.id = "model-upload"
input.addEventListener("change", (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (!target.files)
    return;

  const uploadedFile = target.files[0];
  const url = URL.createObjectURL(uploadedFile);

  loader.load( url, function ( gltf ) {
    scene.add( gltf.scene );
    URL.revokeObjectURL(url);
  }, undefined, function ( error ) {
    console.error( error );
    URL.revokeObjectURL(url);
  } );
})
app.appendChild(input);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

  controls.update();

	renderer.render( scene, camera );
}
animate();