import { PerspectiveCamera } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function useCameraUpdate() {
  const camera = useThree((t) => t.camera);
  useEffect(() => {
    if (!camera) return;
    camera.position.set(4, 4, 4);
    camera.lookAt(-4, -4, -4);
    camera.updateProjectionMatrix();
  }, [camera]);
}

/** There must be a better way to do this */
export function MyCamera() {
  useCameraUpdate();

  return <PerspectiveCamera makeDefault />;
}
