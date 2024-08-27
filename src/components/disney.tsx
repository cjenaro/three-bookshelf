import { Box, Cone, Cylinder, OrbitControls, Ring } from "@react-three/drei";
import { Canvas, Euler, Vector3 } from "@react-three/fiber";
import { BackSide, MeshStandardMaterial } from "three";

function fillV2Array(arr: number[]): [x: number, z: number][] {
  const ret: [x: number, z: number][] = [];
  arr.forEach((n) => {
    arr.forEach((m) => {
      ret.push([n, m]);
    });
  });

  return ret;
}

const CORNERS: [x: number, z: number][] = fillV2Array([-1.4, 1.4]);
const WALL_TOWERS = [
  [-0.75, 1.9],
  [-0.75, -1.9],
  [0.75, 1.9],
  [0.75, -1.9],
  [1.9, -0.75],
  [-1.9, -0.75],
  [1.9, 0.75],
  [-1.9, 0.75],
];

export default function Disney() {
  return (
    <Canvas shadows>
      <ambientLight intensity={Math.PI} />
      <directionalLight castShadow position={[0, 4, 1]} intensity={4} />

      <spotLight
        position={[0, 0.3, 1.2]}
        color="yellow"
        intensity={Math.PI * 2}
        penumbra={0.5}
        castShadow
      />
      <spotLight
        position={[0, -0.3, 1.6]}
        color="yellow"
        intensity={Math.PI * 2}
        penumbra={0.5}
        castShadow
      />

      <color attach="background" args={["#d0a5da"]} />

      <OrbitControls />
      {/* Walls */}
      <Wall position={[0, -0.05, 0]} />

      {CORNERS.map(([x, z]) => (
        <Tower key={x.toString() + z + "tower"} position={[x, 0, z]} />
      ))}

      {WALL_TOWERS.map(([x, z]) => (
        <WallWatchTower
          key={x.toString() + z + "watchtower"}
          position={[x, 0, z]}
        />
      ))}

      <Tower position={[-0.25, -0.05, 1.9]} scale={[0.4, 0.8, 0.4]} />
      <Tower position={[0.25, -0.05, 1.9]} scale={[0.4, 0.8, 0.4]} />
      <spotLight
        position={[0.17, 0, 2.2]}
        color="yellow"
        angle={Math.PI / 40}
        penumbra={0.9}
        castShadow
      />
      <spotLight
        position={[-0.17, 0, 2.2]}
        color="yellow"
        angle={Math.PI / 40}
        penumbra={0.9}
        castShadow
      />

      {/* Inner wall */}
      <Wall position={[0, 0.06, 0]} scale={[0.6, 2, 0.6]} />

      <Tower position={[0.95, 0.1, 0.95]} scale={[0.9, 1.8, 0.9]} />

      <SquaredTower position={[-0.65, 0.3, 0.1]} scale={[1.5, 2.5, 1.5]} />
      <Box args={[1.3, 1, 1.3]} position={[0, 0.34, 0]}>
        <meshStandardMaterial color="pink" />
      </Box>
      <SquaredTower position={[0, 0.3, 0.3]} scale={[2.2, 3, 2.2]} />
      <HexTower />
    </Canvas>
  );
}

function HexTower() {
  return (
    <group position={[0.3, 0, -0.3]}>
      <Cylinder
        castShadow
        receiveShadow
        material={new MeshStandardMaterial()}
        material-color="pink"
        args={[0.25, 0.3, 2, 6]}
        position={[0, 1, 0]}
      />
      <Cylinder
        castShadow
        receiveShadow
        material-color="pink"
        material={new MeshStandardMaterial()}
        args={[0.2, 0.2, 1, 6]}
        position={[0, 2.25, 0]}
      />
      <Cone
        castShadow
        receiveShadow
        material-color="blue"
        material={new MeshStandardMaterial()}
        args={[0.2, 1.42]}
        position={[0, 3.45, 0]}
      />
    </group>
  );
}

function Wall({
  position,
  scale = [1, 1, 1],
  segments = 50,
  rotation = [0, 0, 0],
}: {
  position: Vector3;
  scale?: Vector3;
  segments?: number;
  rotation?: Euler;
}) {
  return (
    <group rotation={rotation} position={position} scale={scale}>
      <Cylinder castShadow receiveShadow args={[2, 2, 0.3, segments, 3, true]}>
        <meshStandardMaterial color="pink" />
      </Cylinder>
      <Cylinder
        castShadow
        receiveShadow
        args={[1.7, 1.7, 0.3, segments, 3, true]}
      >
        <meshStandardMaterial color="pink" side={BackSide} />
      </Cylinder>
      <Ring
        castShadow
        receiveShadow
        position={[0, 0.145, 0]}
        args={[1.7, 2, segments, segments]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="pink" />
      </Ring>
    </group>
  );
}

function WallWatchTower({ position }: { position: Vector3 }) {
  return (
    <group position={position}>
      <Cylinder
        castShadow
        receiveShadow
        args={[0.07, 0.05, 0.03]}
        material-color="blue"
        material={new MeshStandardMaterial()}
        position={[0, -0.1, 0]}
      />
      <Cylinder
        castShadow
        receiveShadow
        args={[0.08, 0.08, 0.2]}
        material-color="blue"
        material={new MeshStandardMaterial()}
      />
      <Cylinder
        castShadow
        receiveShadow
        args={[0.09, 0.08, 0.05]}
        material-color="blue"
        material={new MeshStandardMaterial()}
        position={[0, 0.1, 0]}
      />
      <Cylinder
        castShadow
        receiveShadow
        args={[0.09, 0.09, 0.1]}
        material-color="blue"
        material={new MeshStandardMaterial()}
        position={[0, 0.17, 0]}
      />
    </group>
  );
}

function Tower({
  position,
  scale = [1, 1, 1],
}: {
  position: Vector3;
  scale?: Vector3;
}) {
  return (
    <group position={position} scale={scale}>
      <Cylinder
        castShadow
        receiveShadow
        material={new MeshStandardMaterial()}
        material-color="pink"
        args={[0.25, 0.3, 0.4]}
      />
      <Cylinder
        castShadow
        receiveShadow
        material-color="pink"
        material={new MeshStandardMaterial()}
        args={[0.3, 0.25, 0.1]}
        position={[0, 0.25, 0]}
      />
      <Wall position={[0, 0.34, 0]} scale={[0.15, 0.25, 0.15]} />
      <Cylinder
        castShadow
        receiveShadow
        material-color="hotpink"
        material={new MeshStandardMaterial()}
        args={[0.2, 0.2, 0.2]}
        position={[0, 0.4, 0]}
      />
      <Cone
        castShadow
        receiveShadow
        material-color="blue"
        material={new MeshStandardMaterial()}
        args={[0.22, 0.42]}
        position={[0, 0.7, 0]}
      />
    </group>
  );
}

function SquaredTower({
  position,
  scale = [1, 1, 1],
  rotation = [0, Math.PI / 4, 0],
}: {
  position: Vector3;
  scale?: Vector3;
  rotation?: Euler;
}) {
  const [xScale, yScale] = scale;
  return (
    <group position={position} rotation={rotation}>
      <group scale={scale} position={[0, yScale * 0.12, 0]}>
        <Cylinder
          castShadow
          receiveShadow
          material-color="pink"
          args={[0.25, 0.3, 0.4, 4]}
        >
          <meshStandardMaterial color="pink" />
        </Cylinder>
        <Cylinder
          castShadow
          receiveShadow
          material-color="pink"
          args={[0.3, 0.25, 0.1, 4]}
          position={[0, 0.25, 0]}
        >
          <meshStandardMaterial color="pink" />
        </Cylinder>
        <Wall segments={4} position={[0, 0.33, 0]} scale={[0.15, 0.25, 0.15]} />
        <Cylinder
          castShadow
          receiveShadow
          material-color="pink"
          args={[0.2, 0.2, 0.2, 4]}
          position={[0, 0.4, 0]}
        >
          <meshStandardMaterial color="pink" />
        </Cylinder>
      </group>
      <Cone
        castShadow
        receiveShadow
        material={new MeshStandardMaterial()}
        material-color="blue"
        args={[xScale * 0.22, 0.42, 4]}
        position={[0, 0.7 * yScale, 0]}
      />
    </group>
  );
}
