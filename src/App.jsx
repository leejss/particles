import React, { useEffect, useMemo, useRef } from "react";
// import type { FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import "./App.css";

const Stars = () => {
  let group = useRef();
  let mouseX = 0;
  let mouseY = 0;
  let deltaX = useRef(0);
  let deltaY = useRef(0);
  const moveMouse = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  useEffect(() => {
    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("wheel", (e) => {
      if (e.deltaY > 0) {
        deltaY.current += 1;
      }
      if (e.deltaY < 0) {
        deltaY.current -= 1;
      }
      if (e.deltaX > 0) {
        deltaX.current += 1;
      }
      if (e.deltaX < 0) {
        deltaX.current -= 1;
      }
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    let moveX = mouseX * 0.002;
    let moveY = mouseY * 0.002;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      Math.cos(t / 2) / 8 + moveY + deltaY.current * 0.06,
      0.1
    );

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.sin(t / 2) / 8 + moveX + deltaX.current * 0.05,
      0.1
    );

    // group.current.rotation.z = theta += 0.0005;
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      Math.sin(t / 4) / 5,
      0.1
    );
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
