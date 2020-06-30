import React, { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, extend, useThree } from "react-three-fiber";

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
      maxPolarAngle={Math.PI / 2.5}
      minPolarAngle={Math.PI / 2.5}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

export default Controls;