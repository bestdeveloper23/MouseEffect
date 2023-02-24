import * as THREE from 'three';
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useThree } from '@react-three/fiber'
import { createSculptureWithGeometry } from 'https://unpkg.com/shader-park-core/dist/shader-park-core.esm.js';
import { spCode } from './sp-code.js';

function NoiseEffect(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  const { viewport } = useThree()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  let state = {
    mouse2 : new THREE.Vector3(),
    currMouse : new THREE.Vector3(),
    pointerDown: 0.0,
    currPointerDown: 0.0,
    // audio: 0.0,
    // currAudio: 0.0,
    time: 0.0
  }
  let clock = new THREE.Clock();
  let geometry  = new THREE.SphereGeometry(2, 45, 45);

  // // // Create Shader Park Sculpture
  let mesh = createSculptureWithGeometry(geometry, spCode(), () => ( {
    time: state.time,
    pointerDown: state.pointerDown,
    audio: state.audio,
    mouse: state.mouse2,
    _scale : .5
  } ));
  console.log(mesh)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame(({ mouse }) => {
    state.time += clock.getDelta();
    state.pointerDown = .1 * state.currPointerDown + .9 * state.pointerDown;
    state.mouse2.lerp(state.currMouse, .05 );
    const x = (mouse.x * viewport.width) / 2
    const y = (mouse.y * viewport.height) / 2
    ref.current.position.set(x, y, 0)
    ref.current.rotation.set(-y, x, 0)
});
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh material={mesh.material} geometry={mesh.geometry}
      {...props}
      ref={ref}
      scale={clicked ? 5 : 5}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >      
    </mesh>
  );
}
 
export default NoiseEffect;