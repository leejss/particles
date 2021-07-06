import React, { useEffect, useMemo, useRef } from "react";
// import type { FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";

const Stars = () => {
  let group = useRef();
  // let theta = 0;
  let theta = 0;
  let mouseX = 0;
  let mouseY = 0;
  let deltaX = 0;
  let deltaY = 0;
  const moveMouse = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  // const onWheel = (e) => {
  //   deltaX = e.deltaX;
  //   deltaY = e.deltaY;
  // };
  useEffect(() => {
    window.addEventListener("mousemove", moveMouse);
    // window.addEventListener("wheel", onWheel);
  }, []);
  useFrame((a, b) => {
    // const r = Math.random() * (theta += 0.001);
    let moveX = mouseX * 0.001;
    let moveY = mouseY * 0.001;
    // let delX = deltaX * 0.1;
    // let delY = deltaY * 0.1;
    // group.current.rotation.y = moveX;
    group.current.rotation.x = moveY;
    group.current.rotation.y = moveX;
    group.current.rotation.z = theta += 0.0005;
  });

  const [geo, mat, coords] = useMemo(() => {
    const particles = 5000;
    const geo = new THREE.SphereBufferGeometry(0.2, 10, 10);
    const mat = new THREE.PointsMaterial({ color: new THREE.Color("white") });

    const coords = new Array(particles)
      .fill(0)
      .map((i) => [
        Math.random() * 800 - 400,
        Math.random() * 800 - 400,
        Math.random() * 1000 - 400,
      ]);
    return [geo, mat, coords];
  }, []);
  // console.log(coords);
  return (
    <group ref={group}>
      {coords.map(([p1, p2, p3], i) => (
        <mesh key={i} geometry={geo} material={mat} position={[p1, p2, p3]} />
      ))}
    </group>
  );
};

const App = () => {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <Stars />
    </Canvas>
  );
};

export default App;
