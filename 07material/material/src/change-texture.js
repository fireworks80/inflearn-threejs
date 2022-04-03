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
  const skullTex = textureLoader.load('./textures/skull/Ground Skull_basecolor.jpg');
  skullTex.center.x = 0.5;
  skullTex.center.y = 0.5;

  // texture 변환
  skullTex.wrapS = THREE.RepeatWrapping;
  skullTex.wrapT = THREE.RepeatWrapping;

  // skullTex.offset.x = 0.3;
  // skullTex.offset.y = 0.3;

  // skullTex.repeat.x = 3;
  // skullTex.repeat.y = 3;

  // skullTex.rotation = Math.PI / 4;
  skullTex.rotation = THREE.MathUtils.degToRad(90);

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

  const materialStandard = new THREE.MeshBasicMaterial({
    // color: 'orangered',
    map: skullTex,
  });

  const meshPhong = new THREE.Mesh(geometry, materialStandard);
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
