import { AWARDS, AWARD_ALSO } from "./data";

/* Mini cards: generic title, the placement, and a description that shows the
   scale and what the win unlocked. */
export const Awards = () => (
  <>
    <div className="w-h3">Awards</div>
    <div className="w-mcards">
      {AWARDS.map((a) => (
        <div className="w-mcard" key={a.title}>
          <h4>{a.title}</h4>
          <div className="w-mcap">{a.place}</div>
          <p>{a.desc}</p>
        </div>
      ))}
    </div>
    {AWARD_ALSO && <p className="w-malso">{AWARD_ALSO}</p>}
  </>
);
