import { Suspense, useEffect, useState } from "react";
import { Html, useTexture } from "@react-three/drei";
import { Cartouche } from "@/components/baroque/Cartouche";
import portrait from "../../assets/PIC.png";

type HallKey = "projects" | "awards" | "work" | "education";

const COLS: { x: number; z: number }[] = [-9, -10.6, -12.2, -13.8, -15.4, -17.0].flatMap((z) => [
  { x: -5, z },
  { x: 5, z },
]);

const PORTALS: { key: HallKey; label: string; x: number; z: number; faceY: number }[] = [
  { key: "projects", label: "PROJECTS", x: -6.9, z: -10.5, faceY: Math.PI / 2 },
  { key: "work", label: "WORK EXPERIENCE", x: -6.9, z: -15.5, faceY: Math.PI / 2 },
  { key: "awards", label: "AWARDS", x: 6.9, z: -10.5, faceY: -Math.PI / 2 },
  { key: "education", label: "EDUCATION", x: 6.9, z: -15.5, faceY: -Math.PI / 2 },
];

function AboutPortrait() {
  const tex = useTexture(portrait);
  return (
    <mesh position={[0, 2.2, -17.68]}>
      <planeGeometry args={[2.0, 2.0]} />
      <meshStandardMaterial
        map={tex}
        color="#d8c4a0"
        roughness={0.7}
        metalness={0}
        emissiveMap={tex}
        emissive="#3a2f22"
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function Portal({
  data,
  hover,
  setHover,
  onEnterHall,
}: {
  data: (typeof PORTALS)[number];
  hover: HallKey | null;
  setHover: (k: HallKey | null) => void;
  onEnterHall?: (hall: HallKey) => void;
}) {
  const { key, label, x, z, faceY } = data;
  const active = hover === key;
  const goldEmissive = active ? "#d9b877" : "#8a6d3a";
  const goldIntensity = active ? 0.55 : 0.15;

  return (
    <group position={[x, 0, z]} rotation-y={faceY}>
      <mesh position={[0, 1.9, 0.02]}>
        <boxGeometry args={[1.8, 3.0, 0.1]} />
        <meshStandardMaterial color="#0c0a08" metalness={0} roughness={0.9} emissive="#241608" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[0, 1.9, 0.42]}>
        <planeGeometry args={[1.4, 2.6]} />
        <meshStandardMaterial color="#171512" metalness={0} roughness={0.8} emissive="#d9b877" emissiveIntensity={active ? 0.5 : 0.25} />
      </mesh>

      <mesh position={[0, 3.5, 0.1]}>
        <boxGeometry args={[2.3, 0.26, 0.28]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive={goldEmissive} emissiveIntensity={goldIntensity} />
      </mesh>
      <mesh position={[-1.05, 1.9, 0.1]}>
        <boxGeometry args={[0.26, 3.4, 0.28]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive={goldEmissive} emissiveIntensity={goldIntensity} />
      </mesh>
      <mesh position={[1.05, 1.9, 0.1]}>
        <boxGeometry args={[0.26, 3.4, 0.28]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive={goldEmissive} emissiveIntensity={goldIntensity} />
      </mesh>
      <mesh position={[0, 3.62, 0.14]}>
        <boxGeometry args={[0.3, 0.36, 0.3]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive={goldEmissive} emissiveIntensity={goldIntensity} />
      </mesh>

      <pointLight position={[0, 1.9, 0.5]} color="#d9b877" distance={3.5} intensity={active ? 1.4 : 0.7} />

      <mesh
        position={[0, 1.9, 0.25]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHover(key);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHover(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onEnterHall?.(key);
        }}
      >
        <boxGeometry args={[2.3, 3.6, 0.6]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Html position={[0, 3.95, 0.15]} center distanceFactor={7} style={{ pointerEvents: "none" }}>
        <div className="whitespace-nowrap text-center">
          <span className="font-baroque-label text-lg uppercase tracking-[0.3em]" style={{ color: active ? "#d9b877" : "#c2a572" }}>
            {label}
          </span>
          {active && (
            <span className="mt-1 block font-baroque-label text-xs tracking-[0.2em] text-[#ece4d3]">enter →</span>
          )}
        </div>
      </Html>
    </group>
  );
}

export function Lobby({ onEnterHall }: { onEnterHall?: (hall: HallKey) => void }) {
  const [hover, setHover] = useState<HallKey | null>(null);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <group>
      {/* ── LIGHTING RIG (spotlights render unconditionally; targets nested via attach) ── */}
      <ambientLight color="#ffe9c8" intensity={0.45} />
      <hemisphereLight args={["#3a2f22", "#0c0a08", 0.6]} />

      <spotLight position={[0, 4.6, -15.5]} color="#ffd9a0" angle={0.5} penumbra={0.6} distance={10} intensity={3.2}>
        <object3D attach="target" position={[0, 2.2, -17.7]} />
      </spotLight>
      <pointLight position={[0, 2.4, -16.3]} color="#f0d9a8" distance={6} intensity={1.0} />

      <spotLight position={[-5, 5.2, -8]} color="#ffcf8a" angle={0.7} penumbra={0.8} intensity={1.8}>
        <object3D attach="target" position={[-5, 1, -15]} />
      </spotLight>
      <spotLight position={[5, 5.2, -8]} color="#ffcf8a" angle={0.7} penumbra={0.8} intensity={1.8}>
        <object3D attach="target" position={[5, 1, -15]} />
      </spotLight>

      <pointLight position={[0, 5.6, -12]} color="#ffc188" distance={16} decay={2} intensity={2.2} />
      <pointLight position={[0, 3.0, -8.5]} color="#e9c98a" distance={12} intensity={0.8} />

      {/* ── SHELL ── */}
      <mesh position={[0, 0, -8]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[16, 26]} />
        <meshStandardMaterial color="#2a251d" metalness={0.1} roughness={0.4} />
      </mesh>
      <mesh position={[0, 3.0, -18]}>
        <planeGeometry args={[16, 6.4]} />
        <meshStandardMaterial color="#101013" metalness={0} roughness={0.9} emissive="#171512" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 3.0, 2]} rotation-y={Math.PI}>
        <planeGeometry args={[16, 6.4]} />
        <meshStandardMaterial color="#101013" metalness={0} roughness={0.9} emissive="#171512" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[-7, 3.0, -8]} rotation-y={Math.PI / 2}>
        <planeGeometry args={[24, 6.4]} />
        <meshStandardMaterial color="#101013" metalness={0} roughness={0.9} emissive="#171512" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[7, 3.0, -8]} rotation-y={-Math.PI / 2}>
        <planeGeometry args={[24, 6.4]} />
        <meshStandardMaterial color="#101013" metalness={0} roughness={0.9} emissive="#171512" emissiveIntensity={0.12} />
      </mesh>

      {/* ── CEILING + OCULUS ── */}
      <mesh position={[0, 6, -8]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[16, 26]} />
        <meshStandardMaterial color="#0c0a08" metalness={0} roughness={0.95} emissive="#171512" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0, 5.96, -12]} rotation-x={Math.PI / 2}>
        <planeGeometry args={[6, 8]} />
        <meshStandardMaterial color="#171512" metalness={0.2} roughness={0.6} emissive="#5a3d1e" emissiveIntensity={0.9} />
      </mesh>
      <mesh position={[0, 5.9, -12]} rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.1, 0.12, 12, 48]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive="#d9b877" emissiveIntensity={1.2} />
      </mesh>
      <mesh position={[0, 5.93, -12]} rotation-x={Math.PI / 2}>
        <circleGeometry args={[1.0, 32]} />
        <meshStandardMaterial color="#d9b877" metalness={0.6} roughness={0.3} emissive="#ffe6b0" emissiveIntensity={1.6} />
      </mesh>

      {/* ── COLONNADE (12 columns × shaft/capital/base as plain meshes) ── */}
      {COLS.map((c, i) => (
        <group key={`col-${i}`} position={[c.x, 0, c.z]}>
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.45, 0.45, 4.0, 20]} />
            <meshStandardMaterial color="#171512" metalness={0.2} roughness={0.5} emissive="#3a2f22" emissiveIntensity={0.15} />
          </mesh>
          <mesh position={[0, 4.35, 0]}>
            <cylinderGeometry args={[0.62, 0.62, 0.5, 20]} />
            <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive="#8a6d3a" emissiveIntensity={0.35} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.25, 20]} />
            <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.3} emissive="#8a6d3a" emissiveIntensity={0.35} />
          </mesh>
        </group>
      ))}

      {/* ── CORNICE + DENTIL ── */}
      <mesh position={[-6.85, 4.2, -8]}>
        <boxGeometry args={[0.3, 0.28, 24]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.35} emissive="#8a6d3a" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[6.85, 4.2, -8]}>
        <boxGeometry args={[0.3, 0.28, 24]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.35} emissive="#8a6d3a" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[0, 4.2, -17.85]}>
        <boxGeometry args={[16, 0.28, 0.3]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.35} emissive="#8a6d3a" emissiveIntensity={0.15} />
      </mesh>
      <mesh position={[-6.8, 4.0, -8]}>
        <boxGeometry args={[0.08, 0.08, 24]} />
        <meshStandardMaterial color="#8a6d3a" metalness={0.8} roughness={0.4} emissive="#8a6d3a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[6.8, 4.0, -8]}>
        <boxGeometry args={[0.08, 0.08, 24]} />
        <meshStandardMaterial color="#8a6d3a" metalness={0.8} roughness={0.4} emissive="#8a6d3a" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 4.0, -17.8]}>
        <boxGeometry args={[16, 0.08, 0.08]} />
        <meshStandardMaterial color="#8a6d3a" metalness={0.8} roughness={0.4} emissive="#8a6d3a" emissiveIntensity={0.6} />
      </mesh>

      {/* ── FLOOR MEDALLION ── */}
      <mesh position={[0, 0.02, -12]} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[2.2, 0.06, 12, 64]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.25} emissive="#d9b877" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.02, -12]} rotation-x={-Math.PI / 2}>
        <torusGeometry args={[1.3, 0.05, 12, 64]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.25} emissive="#d9b877" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.03, -12]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.55, 32]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.25} emissive="#d9b877" emissiveIntensity={0.6} />
      </mesh>

      {/* ── ABOUT AEDICULE (hero) ── */}
      <mesh position={[0, 2.4, -17.85]}>
        <boxGeometry args={[3.6, 4.2, 0.15]} />
        <meshStandardMaterial color="#171512" metalness={0.05} roughness={0.5} emissive="#171512" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, 2.2, -17.74]}>
        <planeGeometry args={[2.1, 2.1]} />
        <meshStandardMaterial color="#8a6d3a" metalness={0.3} roughness={0.6} emissive="#d9b877" emissiveIntensity={0.55} />
      </mesh>
      <Suspense fallback={null}>
        <AboutPortrait />
      </Suspense>
      <mesh position={[0, 3.31, -17.66]}>
        <boxGeometry args={[2.44, 0.22, 0.14]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 1.09, -17.66]}>
        <boxGeometry args={[2.44, 0.22, 0.14]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-1.11, 2.2, -17.66]}>
        <boxGeometry args={[0.22, 2.44, 0.14]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[1.11, 2.2, -17.66]}>
        <boxGeometry args={[0.22, 2.44, 0.14]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-1.7, 2.1, -17.72]}>
        <boxGeometry args={[0.28, 3.4, 0.24]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[1.7, 2.1, -17.72]}>
        <boxGeometry args={[0.28, 3.4, 0.24]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 3.95, -17.7]}>
        <boxGeometry args={[4.0, 0.3, 0.26]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[-0.62, 4.32, -17.68]} rotation-z={0.42}>
        <boxGeometry args={[1.7, 0.16, 0.16]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0.62, 4.32, -17.68]} rotation-z={-0.42}>
        <boxGeometry args={[1.7, 0.16, 0.16]} />
        <meshStandardMaterial color="#c2a572" metalness={1.0} roughness={0.28} emissive="#d9b877" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 4.7, -17.66]}>
        <sphereGeometry args={[0.13, 20, 20]} />
        <meshStandardMaterial color="#d9b877" metalness={0.8} roughness={0.3} emissive="#d9b877" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, 0.82, -17.5]}>
        <boxGeometry args={[3.0, 0.22, 0.5]} />
        <meshStandardMaterial color="#171512" metalness={0.05} roughness={0.5} emissive="#171512" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[-1.2, 0.45, -17.5]}>
        <boxGeometry args={[0.22, 0.7, 0.4]} />
        <meshStandardMaterial color="#171512" metalness={0.05} roughness={0.5} emissive="#171512" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[1.2, 0.45, -17.5]}>
        <boxGeometry args={[0.22, 0.7, 0.4]} />
        <meshStandardMaterial color="#171512" metalness={0.05} roughness={0.5} emissive="#171512" emissiveIntensity={0.1} />
      </mesh>

      <Html transform position={[0, 0.55, -17.2]} distanceFactor={2.6} center style={{ pointerEvents: "none" }}>
        <div className="w-[520px]">
          <Cartouche
            eyebrow="the curator"
            title="Samkit Bothra"
            subtitle="Dual-enrolled at Florida Atlantic University — B.S. Computer Science, minor in Financial Technology"
          />
          <p className="mt-3 text-center font-baroque-label text-[13px] uppercase tracking-[0.22em] text-[#c2a572]">
            GPA 3.8 · 80+ college credits · research across AI, sensing &amp; human health · presented at NCUR &amp; FURC
          </p>
        </div>
      </Html>

      {/* ── FOUR PORTALS ── */}
      {PORTALS.map((p) => (
        <Portal key={p.key} data={p} hover={hover} setHover={setHover} onEnterHall={onEnterHall} />
      ))}
    </group>
  );
}
