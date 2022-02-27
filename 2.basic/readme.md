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
