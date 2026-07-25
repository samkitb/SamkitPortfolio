export type WaypointKey = "entrance" | "lobby";

interface Waypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
}

export const WAYPOINTS: Record<WaypointKey, Waypoint> = {
  entrance: { position: [0, 1.6, 1], lookAt: [0, 1.6, -10] },
  lobby: { position: [0, 1.6, -8], lookAt: [0, 1.6, -18] },
};
