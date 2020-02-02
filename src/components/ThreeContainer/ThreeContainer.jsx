import React, { useEffect, useState, useRef } from "react";
import ThreeContainerStyles from "./ThreeContainerStyles.jsx";
import * as THREE from "three";
let cube;
let _c = 0;
let renderer;
const ThreeContainer = ({ x = 0, y = 0, z = 90 }) => {
  const mount = useRef(null);
  const [isAnimating, setAnimating] = useState(true);
  const controls = useRef(null);

  useEffect(() => {
    let width = mount.current.clientWidth;
    let height = mount.current.clientHeight;
    let frameId;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    const geometry = new THREE.BoxGeometry(1, 0.2, 3);
    const shapeColor = new THREE.Color("hsla(220, 100%, 84%, 1)");
    const material = new THREE.MeshStandardMaterial({ color: shapeColor });
    cube = new THREE.Mesh(geometry, material);
    camera.position.set(0, 0, 3);
    scene.add(cube);
    const light = new THREE.DirectionalLight(0xaaddaa, 1.0);
    light.position.set(5, 8, 5);
    scene.add(light);
    renderer.setClearColor("#ffffff");
    renderer.setSize(width, height);

    const renderScene = () => {
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      width = mount.current.clientWidth;
      height = mount.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderScene();
    };

    const animate = () => {
      renderScene();
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = null;
    };

    mount.current.appendChild(renderer.domElement);
    window.addEventListener("resize", handleResize);
    start();

    controls.current = { start, stop };

    return () => {
      stop();
      window.removeEventListener("resize", handleResize);
      mount.current.removeChild(renderer.domElement);

      scene.remove(cube);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  useEffect(() => {
    _c = _c + 1;
    //console.log("RECEI", _c, x, y, z, "WHY", cube);

    cube.rotation.set(
      THREE.Math.degToRad(x),
      THREE.Math.degToRad(y),
      THREE.Math.degToRad(z)
    );
  }, [cube, x, y, z]);

  return (
    <>
      <ThreeContainerStyles ref={mount}></ThreeContainerStyles>
    </>
  );
};

export default ThreeContainer;
