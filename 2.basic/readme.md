# three js

## Scene

장면, 무대

## Mesh

장면 위에 올리는 모든것

- geometry: 모양
- material: 재질

## Camera

어떤 각도로 얼마나 보여 줄 것인가

## Light

material이 어떤 것이냐에 따라 필요 할수도 아닐 수도 있다.

## Renderer

카메라가 보여주는 것을 화면에 그려준다.

## Axis

x: 좌/우
y: 위(+) / 아래(-)
z: 앞(+) / 뒤(-)

<em>화면에 그려지는 renderer 방법 1</em>
canvas(renderer)를 script를 이용해서 넣어준다.

```
# renderer 생성 코드
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
 # renderer.domElement: 화면에 그려질 canvas
document.body.appendChild(renderer.domElement);
```

<em>화면에 그려지는 renderer 방법 2</em>
html body에 `<canvas>`요소를 넣어서 `<canvas>`요소를 가지고 활용 한다.

```
<body>
  <canvas id="canvas"></canvas>
</body>
```

## camera

### PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )

fov: 시야각
aspect: 가로 세로 비율 (width / height)

(mesh가 near / far 사이에 있어야 보인다.)
near: 얼만큼 가까워지면 안보이게 할 것인가
far: 얼마나 멀어져야 안보이게 할 것인가.

```
// camera
const camera = new THREE.PerspectiveCamera(
  75, // fov
  window.innerWidth / window.innerHeight, // 종횡비
  0.1, // near(기본적으로 사용되는 값)
  1000 // far
);

// 거리는 만드는 물건에 따라서 상상?으로 단위를 생각하면 된다.
// ex: 책장과의 거리는 5m 이다.
camera.position.z = 5;
scene.add(camera);
// camera의 위치 설정을 안했으면 (x: 0, y: 0, z: 0)
```

mesh 그리기

```
// Mesh
// 단위는 m으로 설정 했으면 width: 1m, height: 1m, depth: 1m
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000, // css로 컬러값으로 넣을수 있는 값을 넣을 수 도 있다.
});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
```

scene에 넣어 준 요소를 그려준다

```
renderer.render(scene, camera);
```
