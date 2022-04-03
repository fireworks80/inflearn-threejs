import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// ----- 주제: 텍스쳐 변환

export default function example() {
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    console.log('로드 시작');
  };

  loadingManager.onProgress = (img) => {
    console.log(img + '로드');
  };

  loadingManager.onLoad = () => {
    console.log('로드 완료');
  };

  loadingManager.onError = () => {
    console.log('로드 에러');
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const front = textureLoader.load('./textures/mcstyle/front.png');
  const left = textureLoader.load('./textures/mcstyle/left.png');
  const right = textureLoader.load('./textures/mcstyle/right.png');
  const back = textureLoader.load('./textures/mcstyle/back.png');
  const bottom = textureLoader.load('./textures/mcstyle/bottom.png');
  const top = textureLoader.load('./textures/mcstyle/top.png');

  // 각 면이 다르게 설정한다
  const materials = [
    new THREE.MeshBasicMaterial({ map: right }),
    new THREE.MeshBasicMaterial({ map: left }),
    new THREE.MeshBasicMaterial({ map: top }),
    new THREE.MeshBasicMaterial({ map: bottom }),
    new THREE.MeshBasicMaterial({ map: front }),
    new THREE.MeshBasicMaterial({ map: back }),
  ];

  // 각면의 픽셀이 맞게 설정
  right.magFilter = THREE.NearestFilter;
  left.magFilter = THREE.NearestFilter;
  top.magFilter = THREE.NearestFilter;
  bottom.magFilter = THREE.NearestFilter;
  front.magFilter = THREE.NearestFilter;
  back.magFilter = THREE.NearestFilter;

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
  const controls = new OrbitControls(camera, renderer.domElement);

  // Mesh
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const meshPhong = new THREE.Mesh(geometry, materials); // 텍스쳐 배열을 넣어 준다
  scene.add(meshPhong);
  scene.background = new THREE.Color('white');

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
