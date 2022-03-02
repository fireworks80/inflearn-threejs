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

let posY = 0;
let speed = 0;

// device마다의 성능이 다르지만
// Clock()는 성능에 상관없는 절대 시간을 나타 낸다.
// 초당 60회
// 성능이 빠른 곳에서는 1,2,... 가지만
// 성능이 느린곳은 끊기면서 보이지만 움직이는 거리는 빠르건 느리건 똑같다.
const clock = new THREE.Clock();

const draw = () => {
  // 실행 시점으로 부터 총 경과시간을 나타낸다
  // const time = clock.getElapsedTime();

  // draw가 한번 시작 될때마다
  // 이전 draw가 실행했던 것과 현재 draw의 실행시 시간차
  // getElapsedTime과 동시에 쓰면 안된다.
  const delta = clock.getDelta();

  // 각도는 radian을 사용
  //360도는 2파이
  // mesh.rotation.y += 0.1;

  // three.js에서 제공하는 util
  // deg를 radian으로 변경해준다.
  // mesh.rotation.y += THREE.MathUtils.degToRad(1);

  // 일정값이 아닌 경과 값을 넣을때는 =
  // mesh.rotation.y = delta * 10;

  // 이전 실행과의 차이값 (일정값)을 넣어 줄때는 +=
  mesh.rotation.y += delta * 10;

  if (posY > 2) {
    speed = -delta;
  }
  if (posY <= 0) {
    speed = delta;
  }

  posY += speed;

  // 위치
  mesh.position.y = posY;

  renderer.render(scene, camera);
  // requestAnimationFrame(draw);

  // three.js에서 지원하는 것
  // requestAnimationFrame을 사용해도 됨
  // setAnimationLoop를 꼭 사용해야 할 경우는 webXR 만들때
  renderer.setAnimationLoop(draw);
};

window.addEventListener('resize', setSize);

draw();
