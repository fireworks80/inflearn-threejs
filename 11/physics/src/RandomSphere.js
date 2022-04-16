import { Mesh } from 'three';
import { Sphere, Body, Vec3 } from 'cannon-es';

const RandomSphere = class {
  constructor({ scene, world, geometry, material, x, y, z, scale }) {
    this.scale = scale;
    this.x = x;
    this.y = y;
    this.z = z;
    this.mesh = new Mesh(geometry, material);
    this.mesh.scale.set(scale, scale, scale);
    this.mesh.position.set(x, y, z);
    this.mesh.castShadow = true;
    this.cannonWorld = world;
    scene.add(this.mesh);

    this.setCannonBody();
  }

  setCannonBody() {
    const shape = new Sphere(0.5 * this.scale);
    this.cannonBody = new Body({
      mass: 1,
      position: new Vec3(this.x, this.y, this.z),
      shape,
    });
    this.cannonWorld.addBody(this.cannonBody);
  }
};

export default RandomSphere;
