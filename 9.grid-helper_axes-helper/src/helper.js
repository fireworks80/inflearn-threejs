import * as THREE from 'three';

export default function helper() {
  // scene
  const scene = new THREE.Scene();
  // 안개 (색이 fog에 정한 색으로 그라데이션 되는 현상)
  scene.fog = new THREE.Fog('black', 2, 10);

  // mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshStandardMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = 2;
  mesh.position.z = 2;
  scene.add(mesh);

  // camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 1;
  camera.position.y = 3;
  camera.position.z = 0;

  camera.lookAt(mesh.position);

  // light (color, 빛의 강도)

  // ambientLight
  // 전체적으로 은은한 빛을 추가 한다.
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const light = new THREE.DirectionalLight(0xffffff, 1);

  light.position.z = 5;
  light.position.y = 3;
  light.position.x = 1;

  scene.add(light);

  // Axeshelper
  const axesHelper = new THREE.AxesHelper(3);
  scene.add(axesHelper);

  // GridHelper
  const gridHelper = new THREE.GridHelper(5);
  scene.add(gridHelper);

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

  // 그리기
  const clock = new THREE.Clock();

  const draw = () => {
    const time = clock.getElapsedTime();

    mesh.rotation.y = time;

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  };

  window.addEventListener('resize', setSize);
  draw();
}
