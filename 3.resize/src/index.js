import './assets/style.scss';
import * as THREE from 'three';
import { RGBA_ASTC_10x10_Format } from 'three';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 3;
camera.position.y = 3;
camera.position.x = 3;
camera.lookAt(0, 0, 0);

// renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// 픽셀 밀도를 나타낸다
// console.log(window.devicePixelRatio);
// 디바이스의 픽셀밀도 대로 표현한다.
// attribute width, height는 디바이스의 밀도 (맥북프로 2)값으로 화면의 2배의 크기 이지만
// style css값으로 화면의 크기 (밀도의 1/2)로 표현을 해줘서 다 선명하게 보이도록 한다.
renderer.setPixelRatio(window.devicePixelRatio);

// mesh
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

renderer.render(scene, camera);

const setSize = (e) => {
  camera.aspect = window.innerWidth / window.innerHeight;
  // camera를 재설정 후 필수로 해줄것
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener('resize', setSize);
