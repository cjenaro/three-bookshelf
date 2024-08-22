import { Box } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(useGSAP);

const POSITIONS: [x: number, y: number, z: number][] = [];

for (let x = -1; x < 2; x++) {
  for (let y = -1; y < 2; y++) {
    for (let z = -1; z < 2; z++) {
      POSITIONS.push([x, y, z]);
    }
  }
}

function addGap(
  position: [x: number, y: number, z: number],
): [x: number, y: number, z: number] {
  const [x, y, z] = position;
  const gap = 1.1;
  return [x * gap, y * gap, z * gap];
}

export default function Rubicks() {
  const gRef = useRef<Group>(null);

  useGSAP(() => {
    if (!gRef.current) return;

    gsap.to(gRef.current.rotation, {
      ...gRef.current.rotation,
      x: Math.PI * 2,
      y: Math.PI * 4,
      ease: "back.in",
      duration: 6,
      repeat: 4,
    });
  }, [gRef.current]);

  return (
    <Canvas shadows>
      <ambientLight intensity={Math.PI} />
      <directionalLight castShadow position={[0, 1, 0]} intensity={Math.PI} />
      <directionalLight castShadow position={[0, 0, 3]} intensity={6} />

      <color attach="background" args={["black"]} />
      <fog attach="fog" color="white" near={40} far={100} />

      <group ref={gRef}>
        {POSITIONS.map((position, idx) => (
          <Box key={idx} args={[1, 1, 1]} position={addGap(position)}>
            <meshStandardMaterial metalness={3} color="black" />
          </Box>
        ))}
      </group>
    </Canvas>
  );
}
