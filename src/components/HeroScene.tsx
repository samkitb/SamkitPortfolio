import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group, Mesh } from "three";

function Crystal({ reduce }: { reduce: boolean }) {
  const group = useRef<Group>(null);
  const mesh = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (mesh.current && !reduce) {
      mesh.current.rotation.y += delta * 0.18;
      mesh.current.rotation.x += delta * 0.06;
    }
    if (group.current) {
      const tx = state.pointer.y * 0.25;
      const ty = state.pointer.x * 0.45;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshDistortMaterial
          color="#211d16"
          emissive="#3a2a10"
          emissiveIntensity={0.22}
          metalness={0.45}
          roughness={0.3}
          distort={reduce ? 0.12 : 0.32}
          speed={reduce ? 0 : 1.3}
          flatShading
        />
      </mesh>
    </group>
  );
}

export const HeroScene = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className={className} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: "none", width: "100%", height: "100%" }}
        resize={{ scroll: false, debounce: 0 }}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 3]} intensity={2.2} color="#fff3e0" />
        <pointLight position={[-4, -1, -3]} intensity={4} color="#c2a572" />
        <pointLight position={[3, -3, 2]} intensity={1.5} color="#6b7a99" />
        <Suspense fallback={null}>
          <Crystal reduce={reduce} />
        </Suspense>
      </Canvas>
    </div>
  );
};
