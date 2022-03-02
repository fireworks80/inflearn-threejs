import './assets/style.scss';
import * as THREE from 'three';

// scene
const scene = new THREE.Scene();
// 안개 (색이 fog에 정한 색으로 그라데이션 되는 현상)
scene.fog = new THREE.Fog('black', 2, 10);

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 2;
camera.position.x = 1;

camera.lookAt(0, 0, 0);

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial();
const meshes = [];

for (let i = 0; i < 10; i += 1) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = Math.random() * 5 - 2.5;
  mesh.position.z = Math.random() * 5 - 2.5;
  scene.add(mesh);
  meshes.push(mesh);
}

// light (color, 빛의 강도)
const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.z = 5;
light.position.y = 3;
light.position.x = 1;

scene.add(light);

// renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const setSize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

let time = Date.now();

const draw = () => {
  const newTime = Date.now();
  const deltaTime = newTime - time;

  time = newTime;

  meshes.forEach((mesh) => {
    mesh.rotation.y += deltaTime * 0.001;
  });

  renderer.render(scene, camera);

  renderer.setAnimationLoop(draw);
};

window.addEventListener('resize', setSize);

draw();
