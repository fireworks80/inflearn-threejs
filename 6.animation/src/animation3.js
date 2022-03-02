import './assets/style.scss';
import * as THREE from 'three';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

camera.lookAt(0, 0, 0);

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
// meshbasicmaterial은 빛에 반응을 안하므로 light는 사용할 수 없다.
// const material = new THREE.MeshBasicMaterial({ color: 'red' });
const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// light (color, 빛의 강도)
const light = new THREE.DirectionalLight(0xffffff, 1);

light.position.z = 2;
light.position.x = 1.5;

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

let start = Date.now();

// js 내장기능 사용하기 (delta와 같은 방식)
// Date.now(); // 밀리세컨드

const draw = () => {
  const newTime = Date.now();
  const delta = newTime - start;

  start = newTime;

  mesh.rotation.y += delta * 0.001;

  // if (posY > 2) {
  //   speed = -delta;
  // }
  // if (posY <= 0) {
  //   speed = delta;
  // }

  // posY += speed;

  // 위치
  // mesh.position.y = posY;

  renderer.render(scene, camera);
  // requestAnimationFrame(draw);

  // three.js에서 지원하는 것
  // requestAnimationFrame을 사용해도 됨
  // setAnimationLoop를 꼭 사용해야 할 경우는 webXR 만들때
  renderer.setAnimationLoop(draw);
};

window.addEventListener('resize', setSize);

draw();
