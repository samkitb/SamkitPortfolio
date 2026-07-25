import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import * as THREE from "three";
import { WAYPOINTS, type WaypointKey } from "./waypoints";

interface CameraRigProps {
  target: WaypointKey;
  onArrive?: (key: WaypointKey) => void;
}

/* Owns camera travel between named waypoints. While traveling, tweens a
   CatmullRomCurve3 (position) + lerped look-at via GSAP — reusing the same
   tweening engine as the Frontispiece rather than hand-rolling easing.
   OrbitControls only mounts once arrived, so it never fights the tween for
   authority over camera.position (a known r3f gotcha). */
export const CameraRig = ({ target, onArrive }: CameraRigProps) => {
  const { camera } = useThree();
  const [traveling, setTraveling] = useState(true);
  const currentKeyRef = useRef<WaypointKey | null>(null);
  const orbitTargetRef = useRef(new THREE.Vector3());
  const distanceRef = useRef(0.001);

  useEffect(() => {
    const dest = WAYPOINTS[target];
    if (!dest || currentKeyRef.current === target) return;

    const destLook = new THREE.Vector3(...dest.lookAt);

    if (currentKeyRef.current === null) {
      camera.position.set(...dest.position);
      camera.lookAt(destLook);
      orbitTargetRef.current.copy(destLook);
      distanceRef.current = camera.position.distanceTo(destLook) || 0.001;
      currentKeyRef.current = target;
      setTraveling(false);
      onArrive?.(target);
      return;
    }

    const startKey = currentKeyRef.current;
    const startLookAt = WAYPOINTS[startKey].lookAt;
    const start = camera.position.clone();

    setTraveling(true);

    const midpoint = new THREE.Vector3(
      (start.x + dest.position[0]) / 2,
      Math.max(start.y, dest.position[1]) + 1.1,
      (start.z + dest.position[2]) / 2
    );
    const curve = new THREE.CatmullRomCurve3([start, midpoint, new THREE.Vector3(...dest.position)]);

    const proxy = { t: 0 };
    const tween = gsap.to(proxy, {
      t: 1,
      duration: 2.2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.position.copy(curve.getPointAt(proxy.t));
        const look = new THREE.Vector3(
          THREE.MathUtils.lerp(startLookAt[0], dest.lookAt[0], proxy.t),
          THREE.MathUtils.lerp(startLookAt[1], dest.lookAt[1], proxy.t),
          THREE.MathUtils.lerp(startLookAt[2], dest.lookAt[2], proxy.t)
        );
        camera.lookAt(look);
        orbitTargetRef.current.copy(look);
      },
      onComplete: () => {
        distanceRef.current = camera.position.distanceTo(orbitTargetRef.current) || 0.001;
        currentKeyRef.current = target;
        setTraveling(false);
        onArrive?.(target);
      },
    });

    return () => {
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (traveling) return null;

  return (
    <OrbitControls
      makeDefault
      enablePan={false}
      enableZoom={false}
      target={orbitTargetRef.current}
      minDistance={distanceRef.current}
      maxDistance={distanceRef.current}
      minPolarAngle={Math.PI * 0.25}
      maxPolarAngle={Math.PI * 0.75}
    />
  );
};
