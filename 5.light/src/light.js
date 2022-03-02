import './assets/style.scss';
import * as THREE from 'three';

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 3;
camera.position.x = 2;
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

renderer.render(scene, camera);

const setSize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
};

window.addEventListener('resize', setSize);
