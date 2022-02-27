import './assets/style.scss';
import * as THREE from 'three';

console.log(THREE);

// javascript로 body에 renderer를 넣어주는 방법
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

const canvas = document.querySelector('#canvas');

// renderer로 사용될 canvas설정
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
