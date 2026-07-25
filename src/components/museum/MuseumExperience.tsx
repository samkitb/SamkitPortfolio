import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { CameraRig } from "./CameraRig";
import { Lobby } from "./Lobby";
import { Cartouche } from "@/components/baroque/Cartouche";
import type { WaypointKey } from "./waypoints";

/* Force r3f to the real viewport size. In this preview its ResizeObserver-based
   auto-measure can get stuck small (renders into a corner); calling setSize
   explicitly with the window size overrides that and is robust everywhere. */
function CanvasResizer() {
  const setSize = useThree((s) => s.setSize);
  useEffect(() => {
    const apply = () => setSize(window.innerWidth, window.innerHeight);
    apply();
    const t = window.setTimeout(apply, 120);
    window.addEventListener("resize", apply);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", apply);
    };
  }, [setSize]);
  return null;
}

interface MuseumExperienceProps {
  onSkipTour?: () => void;
}

export const MuseumExperience = ({ onSkipTour }: MuseumExperienceProps) => {
  const [waypoint, setWaypoint] = useState<WaypointKey>("entrance");

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      <Canvas camera={{ fov: 55 }} shadows={false} resize={{ scroll: false, debounce: 0 }}>
        <CanvasResizer />
        <Suspense fallback={null}>
          <Lobby onEnterHall={() => { /* room travel wired in the next build step */ }} />
          <CameraRig target={waypoint} />
        </Suspense>
      </Canvas>

      <AnimatePresence>
        {waypoint === "entrance" && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-9 px-6"
          >
            <Cartouche
              size="large"
              eyebrow="researcher · technologist · mentor"
              title="Samkit Bothra"
              subtitle="Florida Atlantic University · Computer Science"
            />
            <button
              onClick={() => setWaypoint("lobby")}
              className="pointer-events-auto rounded-full bg-primary px-7 py-3 font-baroque-label text-xs uppercase tracking-widest text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              Start tour
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {onSkipTour && (
        <button
          onClick={onSkipTour}
          className="pointer-events-auto absolute right-6 top-6 z-10 font-baroque-label text-xs uppercase tracking-widest text-muted-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          Skip tour
        </button>
      )}
    </div>
  );
};
