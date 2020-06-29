import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

import "./style.css";

extend({ OrbitControls });

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolAngle={Math.PI / 3}
      minPolAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Plant = ({form}) => {
  const [model, setModel] = useState();
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [5, 5, 5] : [3, 3, 3]
  });
  useEffect(() => {
    new GLTFLoader().load(`/assets/bamboo_${form}.gltf`, setModel);
  }, []);
  if (model) {
    model.scene.scale.set(3, 3, 3);
  }
  return model ? <a.primitive object={model.scene} onPointerOver={() => setActive(!active)} onPointerOut={() => setActive(!active)} scale={props.scale} castShadow /> : null;
};

const Plane = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhysicalMaterial attach="material" color="brown" />
    </mesh>
  );
};

const Box = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
    color: hovered ? "gray" : "red",
  });

  return (
    <a.mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
      scale={props.scale}
      castShadow
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} castShadow />
      <a.meshPhysicalMaterial attach="material" color={props.color} />
    </a.mesh>
  );
};

function PlantsRender({form}) {
  return (
    <Canvas
      camera={{ position: [1, 2, 5] }}
      onCreated={({ gl }) => {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = THREE.PCFShadowMap;
      }}
    >
      <fog attach="fog" args={["white", 5, 20]} />
      <ambientLight />
      <spotLight position={[15, 20, 5]} penumbra={1} />
      <Controls />
      <Plant form={form} />
    </Canvas>
  );
}

export default PlantsRender;