import './assets/style.scss';
import * as THREE from 'three';

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

// scene
// scene이 renderer보다 위에 있다.
// scene에 배경색을 넣으면 renderer는 무시 된다.
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');

// camera
const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);

camera.position.z = 5;
camera.position.y = 5;
camera.position.x = 5;
camera.lookAt(0, 0, 0);

// mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x238493 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// renderer
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true, // 검은 배경색을 투명하게 한다.
});
renderer.setSize(windowWidth, windowHeight);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setClearAlpha(0.5); // 0 ~ 1 불투명도 설정
// renderer.setClearColor(0x00ff00);
renderer.setClearColor('#00ff00');
renderer.setClearAlpha(0.5);

renderer.render(scene, camera);

const setSize = () => {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  camera.aspect = windowWidth / windowHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(windowWidth, windowHeight);
  renderer.render(scene, camera);
};

window.addEventListener('resize', setSize);
