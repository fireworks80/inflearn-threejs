import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import PreventDrag from './preventDrag';
// ----- 주제:

export default function example() {
  // Renderer
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

  const preventDrag = new PreventDrag(canvas);

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 3;
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

  // raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // Mesh
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const basicMaterial = new THREE.MeshStandardMaterial({ color: 'plum' });
  const boxMesh = new THREE.Mesh(boxGeometry, basicMaterial);
  boxMesh.name = 'box';

  const torusGeo = new THREE.TorusGeometry(2, 0.5, 16, 100);
  const torusMaterial = new THREE.MeshStandardMaterial({ color: 'lime' });
  const torusMesh = new THREE.Mesh(torusGeo, torusMaterial);
  torusMesh.name = 'torus';

  scene.add(boxMesh, torusMesh);

  const meshes = [boxMesh, torusMesh];

  // controls
  const controls = new OrbitControls(camera, renderer.domElement);

  // 그리기
  const clock = new THREE.Clock();

  function draw() {
    // const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // boxMesh.position.y = Math.sin(time) * 2;
    // torusMesh.position.y = Math.cos(time) * 2;

    // boxMesh.material.color.set('plum');
    // torusMesh.material.color.set('lime');

    renderer.render(scene, camera);
    renderer.setAnimationLoop(draw);
  }

  function setSize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  const checkIntersect = () => {
    // console.log(preventDrag.isMoved);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    // console.log(intersects);

    intersects.forEach((item, idx) => {
      // if (idx > 0) return;
      console.log(item.object.name);
      item.object.material.color.set('red');
    });
  };

  // 이벤트

  window.addEventListener('resize', setSize);
  canvas.addEventListener('click', (e) => {
    // console.log(e.clientX, e.clientY);
    mouse.x = (e.clientX / canvas.clientWidth) * 2 - 1;
    mouse.y = -((e.clientY / canvas.clientHeight) * 2 - 1);
    // console.log(mouse);
    if (preventDrag.isMoved) return;
    checkIntersect();
  });

  draw();
}
