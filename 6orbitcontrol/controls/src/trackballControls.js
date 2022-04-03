import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

// ----- 주제: TrackballControlㄴ
// - enableDamping 기본적용
// update()를 하지 않으면 마우스로 움직일 수 없다.

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = 1.5;
  camera.position.z = 4;
  scene.add(camera);

  // Light
  const ambientLight = new THREE.AmbientLight('white', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('white', 1);
  directionalLight.position.x = 1;
  directionalLight.position.z = 2;
  scene.add(directionalLight);

  // Controls
  //
  const controls = new TrackballControls(camera, renderer.domElement);
  controls.maxDistance = 20;
  controls.minDistance = 5;
  // controls.target.set(3, 3, 3);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  let mesh;
  let material;

  for (let i = 0; i < 20; i += 1) {
    material = new THREE.MeshStandardMaterial({
      color: `rgb(
        ${Math.floor(Math.random() * 205) + 50}, 
        ${Math.floor(Math.random() * 205) + 50}, 
        ${Math.floor(Math.random() * 205) + 50}
        )
      `,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 5;
    mesh.position.y = (Math.random() - 0.5) * 5;
    mesh.position.z = (Math.random() - 0.5) * 5;

    scene.add(mesh);
  }

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    const delta = clock.getDelta();

    controls.update();
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
