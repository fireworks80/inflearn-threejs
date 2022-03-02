import './assets/style.scss';
import * as THREE from 'three';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 2;
camera.lookAt(0, 0, 0);

// const camera = new THREE.OrthographicCamera(
//   -(window.innerWidth / window.innerHeight),
//   window.innerWidth / window.innerHeight,
//   1,
//   -1,
//   0.1,
//   1000
// );

// camera.position.z = 5;
// camera.position.y = 5;
// camera.position.x = 5;
// camera.lookAt(0, 0, 0);
// camera.zoom = 0.8;
// camera.updateProjectionMatrix();

// renderer
const canavs = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 'red' });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

renderer.render(scene, camera);
