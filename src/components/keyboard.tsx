// https://dribbble.com/shots/22831775-Cute-Keyboard-3D-Illustration
import {
  Center,
  FontData,
  PerspectiveCamera,
  Plane,
  PresentationControls,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { Canvas, useThree, Vector3 } from "@react-three/fiber";
import firaCode from "@/fonts/firacode.json";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useKeyListener } from "@/hooks/use-key-listener";

gsap.registerPlugin(useGSAP);

const KEYS: [number, number, string][] = [
  [-0.7, 0.7, "cmd"],
  [0.7, -0.7, "x"],
  [0.7, 0.7, "z"],
  [-0.7, -0.7, "c"],
];

const BORDERS: { position: Vector3; rotated: boolean }[] = [
  { position: [0, 0.19, 1.45], rotated: false },
  { position: [-1.45, 0.19, 0], rotated: true },
  { position: [0, 0.19, -1.45], rotated: false },
  { position: [1.45, 0.19, 0], rotated: true },
];

function useCameraUpdate() {
  const camera = useThree((t) => t.camera);
  useEffect(() => {
    if (!camera) return;
    camera.position.set(4, 4, 4);
    camera.lookAt(-4, -4, -4);
    camera.updateProjectionMatrix();
  }, [camera]);
}

function MyCamera() {
  useCameraUpdate();

  return <PerspectiveCamera makeDefault />;
}

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
        {BORDERS.map(({ position, rotated }) => (
          <RoundedBox
            key={position.toString()}
            position={position}
            radius={0.05}
            args={[2.95, 0.5, 0.1]}
            receiveShadow
            castShadow
            rotation={[0, rotated ? Math.PI / 2 : 0, 0]}
          >
            <meshStandardMaterial color="rebeccapurple" />
          </RoundedBox>
        ))}
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
