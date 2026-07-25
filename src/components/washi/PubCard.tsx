import { useState } from "react";
import { PUBLICATION } from "./data";
import { useFlipHeight } from "./useFlipHeight";

/* The publication card, flipped to reveal its abstract. Reuses the same 3D flip
   mechanic as the Education/Experience cards (.w-fc / .w-flip / .w-face). The DOI
   link stops propagation so clicking it opens the paper instead of flipping. */
export const PubCard = () => {
  const [flipped, setFlipped] = useState(false);
  const toggle = () => setFlipped((v) => !v);
  const { frontRef, backRef, height } = useFlipHeight(flipped);

  return (
    <div
      className={flipped ? "w-fc w-pubflip flipped" : "w-fc w-pubflip"}
      role="button"
      tabIndex={0}
      aria-pressed={flipped}
      aria-label={flipped ? "Publication abstract" : "Flip to read the abstract"}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <div className="w-flip" style={{ height }}>
        <div className="w-face w-back" ref={backRef}>
          <div className="w-fcap">Abstract</div>
          <p className="w-abs">{PUBLICATION.abstract}</p>
          <div className="w-fliphint">← flip back</div>
        </div>

        <div className="w-face w-pubfront" ref={frontRef}>
          <div className="t">{PUBLICATION.title}</div>
          <div className="m">{PUBLICATION.meta}</div>
          <div className="m">
            DOI{" "}
            <a
              href={`https://doi.org/${PUBLICATION.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              {PUBLICATION.doi}
            </a>
          </div>
          <div className="w-fliphint">tap to read the abstract →</div>
        </div>
      </div>
    </div>
  );
};
