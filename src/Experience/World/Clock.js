import * as THREE from "three";
import Experience from "../Experience";

export default class Clock {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setSquare();
  }

  setSquare() {
    const degreeRadius = (deg) => {
      return (deg / 180) * Math.PI;
    };

    const randomScale = (num) => {
      return Math.random() * num + 1;
    };

    const num = 12;

    for (let i = 0; i < num; i++) {
      const slice = degreeRadius(360 / num);
      const angle = slice * i;

      let x = 1.5 * Math.sin(angle);
      let y = 1.5 * Math.cos(angle);

      let scaleX = 0.1;
      let scaleY = 0.3;

      const bigHand = 6;
      const smallHand = 2;
      const handWidth = 1;

      // meshes

      this.model = {};
      this.model.square = new THREE.BoxGeometry(scaleX, scaleY, 0.1);

      this.model.material = new THREE.MeshStandardMaterial();

      this.model.cube = new THREE.Mesh(this.model.square, this.model.material);

      this.model;

      // clock transformations

      if (i % 3 !== 0) {
        this.model.cube.position.set(x, y, 0);
        this.model.cube.scale.set(
          randomScale(3) * scaleX * smallHand,
          randomScale(1.5) * scaleY * smallHand,
          handWidth
        );
        this.model.cube.rotation.z = -angle;

        this.scene.add(this.model.cube);
      } else {
        this.model.cube.position.set(x, y, 0);
        this.model.cube.scale.set(
          scaleX * bigHand + 0.5,
          scaleY * bigHand,
          handWidth
        );
        this.model.cube.rotation.z = -angle;

        this.scene.add(this.model.cube);
      }
    }

    for (let i = 0; i < 60; i++) {
      this.model.circle = new THREE.SphereGeometry(0.015, 8, 8);

      this.model.sphere = new THREE.Mesh(
        this.model.circle,
        this.model.material
      );

      if (i % 5 !== 0) {
        const slice = degreeRadius(360 / 60);
        const angle = slice * i;

        let x = 1.5 * Math.sin(angle);
        let y = 1.5 * Math.cos(angle);

        this.model.sphere.position.set(x, y, 0);

        this.scene.add(this.model.sphere);
      }
    }
  }
}
