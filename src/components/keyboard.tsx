// https://dribbble.com/shots/22831775-Cute-Keyboard-3D-Illustration
import {
  Center,
  FontData,
  Plane,
  PresentationControls,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { Canvas, Vector3 } from "@react-three/fiber";
import firaCode from "@/fonts/firacode.json";
import * as THREE from "three";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useKeyListener } from "@/hooks/use-key-listener";
import { MyCamera } from "./camera";
import HollowBox from "./hollow-box";

gsap.registerPlugin(useGSAP);

const KEYS: [number, number, string][] = [
  [-0.7, 0.7, "cmd"],
  [0.7, -0.7, "x"],
  [0.7, 0.7, "z"],
  [-0.7, -0.7, "c"],
];

function Key({ letter, z, x }: { letter?: string; z: number; x: number }) {
  const [down, set] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.position, {
      ...groupRef.current.position,
      y: down ? 0 : 0.2,
      ease: "back.out",
    });
  }, [down]);

  function goDown() {
    set(true);
  }

  function goUp() {
    set(false);
  }

  useKeyListener(letter === "cmd" ? "Meta" : letter || "", goDown);
  useKeyListener(letter === "cmd" ? "Meta" : letter || "", goUp, "keyup");

  return (
    <group
      ref={groupRef}
      position={[x, 0.2, z]}
      onPointerUp={goUp}
      onPointerDown={goDown}
    >
      <RoundedBox
        castShadow
        receiveShadow
        radius={0.15}
        creaseAngle={2}
        args={[1.3, 0.5, 1.3]}
      >
        <meshStandardMaterial color="#ececec" />
      </RoundedBox>
      <Center position={[0, 0.25, 0]} rotation={[Math.PI / -2, 0, 0]}>
        <Text3D
          castShadow
          receiveShadow
          font={firaCode as FontData}
          scale={0.25}
        >
          {letter}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </group>
  );
}

export default function Keyboard() {
  return (
    <Canvas shadows eventPrefix="client">
      <ambientLight intensity={Math.PI / 2} />
      <directionalLight castShadow position={[2, 4, 2]} intensity={Math.PI} />

      <MyCamera />
      <color attach="background" args={["hotpink"]} />
      <fog attach="fog" color="hotpink" near={40} far={100} />
      <PresentationControls>
        <Plane
          position={[0, -0.2, 0]}
          scale={20}
          rotation-x={Math.PI / 2}
          receiveShadow
        >
          <meshStandardMaterial color="#ff618a" side={THREE.DoubleSide} />
        </Plane>
        <RoundedBox
          position={[0, 0, 0]}
          radius={0.1}
          args={[3, 0.3, 3]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial color="rebeccapurple" />
        </RoundedBox>
        <HollowBox />
        <group>
          {KEYS.map(([x, z, letter]) => (
            <Key
              key={x.toFixed(2) + z.toFixed(2) + letter}
              x={x}
              z={z}
              letter={letter}
            />
          ))}
        </group>
      </PresentationControls>
    </Canvas>
  );
}
