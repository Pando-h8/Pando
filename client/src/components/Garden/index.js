import React, { useState, useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Garden = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load(`/assets/Field_1268.gltf`, setModel);
  }, []);
  if (model) {
    model.scene.scale.set(1/10, 1/10, 1/10);
  }
  return model ? <primitive
    position={[0,-2.5,0]} 
    object={model.scene} castShadow /> : null;
};

export default Garden;