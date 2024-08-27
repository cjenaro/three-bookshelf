import { RoundedBox } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";

const BORDERS: { position: Vector3; rotated: boolean }[] = [
  { position: [0, 0.19, 1.45], rotated: false },
  { position: [-1.45, 0.19, 0], rotated: true },
  { position: [0, 0.19, -1.45], rotated: false },
  { position: [1.45, 0.19, 0], rotated: true },
];

export default function HollowBox() {
  return (
    <group>
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
    </group>
  );
}
