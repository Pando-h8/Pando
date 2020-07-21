import React, { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { extend } from "react-three-fiber";
import { useSpring, a } from "react-spring/three";

const Plant = ({nama, form, position}) => {
  console.log(form);
  const [model, setModel] = useState();
  const [active, setActive] = useState(false);
  const props = useSpring({
    scale: active ? [3.5, 3.5, 3.5] : [3, 3, 3]
  });
  useEffect(() => {
    new GLTFLoader().load(`/assets/${nama.toLowerCase()}_${form}.gltf`, setModel);
  }, []);
  if (model) {
    model.scene.scale.set(3, 3, 3);
  }
  return model ? <a.primitive
    position={position} 
    object={model.scene} 
    onPointerOver={() => setActive(!active)} 
    onPointerOut={() => setActive(!active)} 
    scale={props.scale} castShadow /> : null;
};

export default Plant;