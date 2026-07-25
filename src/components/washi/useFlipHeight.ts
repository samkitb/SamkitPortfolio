import { useLayoutEffect, useRef, useState } from "react";

/* Sizes a flip card to whichever face is showing, so the front has no dead space
   and the card grows when flipped to the (usually taller) back.

   Both faces are absolutely positioned and left at natural height; this measures
   them and hands back the height the container should animate to. A ResizeObserver
   catches reflows — font swaps, window resize — so the measurement self-corrects. */
export function useFlipHeight(flipped: boolean) {
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>();

  useLayoutEffect(() => {
    const measure = () => {
      const f = frontRef.current?.offsetHeight ?? 0;
      const b = backRef.current?.offsetHeight ?? 0;
      setHeight(flipped ? b : f);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (frontRef.current) ro.observe(frontRef.current);
    if (backRef.current) ro.observe(backRef.current);
    return () => ro.disconnect();
  }, [flipped]);

  return { frontRef, backRef, height };
}
