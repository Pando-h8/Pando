import React, { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";
import Controls from '../Controls';
import Plant from '../Plant';
import Garden from '../Garden';
import Birds from '../Birds';

import "./PlantRender.css";

function PlantsRender({umur, nama, form}) {
  return (
    <div className="Canvas3D">
      <h1>{nama}</h1>
      <p>{umur} Hari</p>
      <Canvas
        camera={{ position: [0, 0, 10] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <fog attach="fog" args={["gray", 10, 40]} />
        <ambientLight />
        <spotLight position={[15, 20, 5]} penumbra={1} />
        <Controls />
        <Plant nama={nama} form={form} />
        <Garden />
        <Suspense fallback={null}>
          <Birds />
      </Suspense>
      </Canvas>
    </div>
  );
}

export default PlantsRender;


// const Plane = () => {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]} receiveShadow>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <meshPhysicalMaterial attach="material" color="brown" />
//     </mesh>
//   );
// };

// const Box = () => {
//   const meshRef = useRef();
//   const [hovered, setHovered] = useState(false);
//   const [active, setActive] = useState(false);
//   const props = useSpring({
//     scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
//     color: hovered ? "gray" : "red",
//   });

//   return (
//     <a.mesh
//       ref={meshRef}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       onClick={() => setActive(!active)}
//       scale={props.scale}
//       castShadow
//     >
//       <boxBufferGeometry attach="geometry" args={[1, 1, 1]} castShadow />
//       <a.meshPhysicalMaterial attach="material" color={props.color} />
//     </a.mesh>
//   );
// };