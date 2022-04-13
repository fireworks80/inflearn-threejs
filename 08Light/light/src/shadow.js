import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui';

// ----- 주제: ambient light
// 전체적으로 은은하게 빛을 뿌려준다.
// 단독으로만 사용하지 않고 다른 빛과 같이 사용한다.

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
  renderer.shadowMap.enabled = true;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const light = new THREE.AmbientLight('white', 0.5);
  scene.add(light);

  // 태양광 같은 빛
  const directionalLight = new THREE.DirectionalLight('red', 0.5);

  directionalLight.position.y = 3;

  scene.add(directionalLight);

  const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
  scene.add(lightHelper);

  // shadow
  // mapsize에 따라 그림자 선명도가 달라진다
  // 너무 많은 값은 느려진다
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024; // 기본갑 512
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.radius = 5;

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // Geometry
  const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
  const planeGeometry = new THREE.PlaneGeometry(10, 10);
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

  // Material
  const material1 = new THREE.MeshStandardMaterial({ color: 'royalblue' });
  const material2 = new THREE.MeshStandardMaterial({ color: 'white' });
  const material3 = new THREE.MeshStandardMaterial({ color: 'gold' });

  // Mesh
  const sphere = new THREE.Mesh(sphereGeometry, material1);
  const plane = new THREE.Mesh(planeGeometry, material2);
  const box = new THREE.Mesh(boxGeometry, material3);
  scene.add(sphere, plane, box); // ,로 구분하면 여러개를 한번에 add 할 수 있다

  plane.receiveShadow = true;
  box.castShadow = true;
  box.receiveShadow = true;
  sphere.receiveShadow = true;
  sphere.castShadow = true;

  plane.rotation.x = -Math.PI * 0.5;
  box.position.set(1, 1, 0);
  sphere.position.set(-1, 1, 0);

  // AxesHelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // Dat GUI
  const gui = new dat.GUI();
  gui.add(directionalLight.position, 'x', -5, 5);
  gui.add(directionalLight.position, 'y', -5, 5);
  gui.add(directionalLight.position, 'z', 2, 10);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // 삼각함수를 공부하자
    // directionalLight.position.x = Math.cos(time) * 5;
    // directionalLight.position.z = Math.sin(time) * 5;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  // 이벤트
  window.addEventListener('resize', setSize);

  draw();
}
