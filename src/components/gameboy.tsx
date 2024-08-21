import { Canvas } from "@react-three/fiber";
import { Cylinder, RoundedBox } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MutableRefObject, useRef } from "react";
import { Group } from "three";

gsap.registerPlugin(useGSAP);

function useSpinOnMount(meshRef: MutableRefObject<Group | null>) {
  useGSAP(() => {
    if (!meshRef.current) return;

    gsap.to(meshRef.current.rotation, {
      ...meshRef.current.rotation,
      x: Math.PI * 2,
      y: Math.PI * 2,
      ease: "back.inOut",
      duration: 2,
    });
  }, [meshRef.current]);
}

export default function Gameboy() {
  const gbRef = useRef<Group>(null);
  useSpinOnMount(gbRef);
  return (
    <Canvas shadows>
      <ambientLight intensity={Math.PI} />
      <directionalLight castShadow position={[0, 1, 0]} intensity={Math.PI} />

      <color attach="background" args={["#12355b"]} />
      <fog attach="fog" color="#12355b" near={40} far={100} />

      <group ref={gbRef} rotation={[0, -0.1, -0.4]} position={[0, 0.4, 0]}>
        <RoundedBox
          args={[2, 3, 1]}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          radius={0.1}
        >
          <meshStandardMaterial color="hotpink" />
        </RoundedBox>
        <RoundedBox
          args={[1.7, 1.3, 0.4]}
          castShadow
          receiveShadow
          position={[0, 0.65, 0.35]}
          radius={0.14}
        >
          <meshStandardMaterial color="#ffffea" />
        </RoundedBox>

        <group key="a-b-buttons">
          <Cylinder
            args={[0.1, 0.1, 0.4]}
            position={[0.4, -0.7, 0.33]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#420039" />
          </Cylinder>
          <Cylinder
            args={[0.1, 0.1, 0.4]}
            position={[0.7, -0.6, 0.33]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#420039" />
          </Cylinder>
        </group>

        <group key="arrows">
          <RoundedBox
            castShadow
            receiveShadow
            args={[0.5, 0.18, 0.3]}
            position={[-0.55, -0.6, 0.4]}
          >
            <meshStandardMaterial color="#420039" />
          </RoundedBox>
          <RoundedBox
            castShadow
            receiveShadow
            args={[0.18, 0.5, 0.3]}
            position={[-0.55, -0.6, 0.4]}
          >
            <meshStandardMaterial color="#420039" />
          </RoundedBox>
        </group>

        <group key="select-start">
          <RoundedBox
            castShadow
            receiveShadow
            args={[0.18, 0.1, 0.3]}
            position={[-0.14, -1.2, 0.4]}
          >
            <meshStandardMaterial color="#420039" />
          </RoundedBox>
          <RoundedBox
            castShadow
            receiveShadow
            args={[0.18, 0.1, 0.3]}
            position={[0.14, -1.2, 0.4]}
          >
            <meshStandardMaterial color="#420039" />
          </RoundedBox>
        </group>
      </group>

      <Cylinder args={[2.3, 2.3, 0.1, 70]} position={[0, -2, 0]} receiveShadow>
        <meshStandardMaterial color="#ffed66" />
      </Cylinder>
    </Canvas>
  );
}
