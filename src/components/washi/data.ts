/* All content sourced from Samkit_Bothra_Resume.pdf (July 2026).
   The About prose is the only written-not-quoted text — edit freely. */

export const PROFILE = {
  name: "Samkit Bothra",
  roles: ["RESEARCHER", "DEVELOPER", "FOUNDER"],
  email: "samkitbothra11@gmail.com",
  emailEdu: "sb73635@my.utexas.edu",
  phone: "(754) 946-0764",
  site: "samkitbothra.org",
  github: "https://github.com/samkitb",
  linkedin: "https://www.linkedin.com/in/samkit-bothra",
  location: "Boca Raton, FL → Austin, TX",
  reading: "UT Austin · CS & Neuroscience",
};

/* Samkit's own draft (2026-07-23), lightly edited: typos fixed, one redundancy
   removed, and split into three paragraphs. Language otherwise his.

   ONE on-site consistency flag, unresolved: this says "first-authored multiple
   publications" but the Publication section below lists ONE. Either add the
   others there or make this singular. */
export const ABOUT = [
  "I am a freshman at **UT Austin**, majoring in an integrated degree spanning **Computer Science and Neuroscience**. Through dual enrollment at Florida Atlantic University since my freshman year of high school, I've accumulated 100+ college credits and had the chance to take college-level courses (Data Structures, Calculus 1-3, Matrix Theory) and work in undergraduate research along the way.",
  "I especially enjoy working at the intersection of computer science and other disciplines like **medicine**, **finance**, and **robotics**. That work has let me present at national conferences and first-author multiple publications before starting college. I'm just as drawn to entrepreneurial ventures, where I get to apply what I learn in classes and research labs to a real problem. A couple of my past ventures led to winning statewide competitions and earning access to startup incubators and accelerators.",
  "At UT Austin, I hope to feed that curiosity by joining entrepreneurial and technical clubs and learning from my professors. And when I get some free time, I'm usually outside playing golf or pickleball, or going for a walk somewhere in beautiful Austin.",
];

/* NOT RENDERED. The "What I do" block was removed from the About tab on
   2026-07-23. Kept here (with its .w-doing/.w-do CSS) so it's a paste-back
   away if you want it again; say the word and I'll delete both. */
export const DOING = [
  { n: "I", h: " AI", p: "Biomedical NLP and retrieval: symptom-to-ontology normalization, hybrid dense + sparse encoders, calibrated rerankers." },
  { n: "II", h: "Quantum optimization", p: "QUBO/Ising formulations on D-Wave hardware for surgical planning, wrapped in a regulated SaMD product." },
  { n: "III", h: "ML research", p: "Action-conditional JEPA for counterfactual forecasting, biomechanics modelling, and published sensor research." },
  { n: "IV", h: "Full-stack", p: "Shipping the whole thing: React and TypeScript front ends over Flask and FastAPI services, deployed and live." },
];

/* icon = key into LOGOS (Simple Icons). Omitted where no honest mark exists —
   SQL and REST APIs are generic, FAISS/Qdrant aren't in the set, and Java's own
   mark is trademark-restricted, so those ride as text. */
export const SKILLS: { t: string; icon?: string }[] = [
  { t: "Python", icon: "python" },
  { t: "TypeScript", icon: "typescript" },
  { t: "JavaScript", icon: "javascript" },
  { t: "SQL" },
  { t: "Java" },
  { t: "PyTorch", icon: "pytorch" },
  { t: "scikit-learn", icon: "scikitlearn" },
  { t: "pandas", icon: "pandas" },
  { t: "NumPy", icon: "numpy" },
  { t: "FAISS" },
  { t: "Qdrant" },
  { t: "transformers", icon: "huggingface" },
  { t: "React", icon: "react" },
  { t: "Flask", icon: "flask" },
  { t: "FastAPI", icon: "fastapi" },
  { t: "MySQL", icon: "mysql" },
  { t: "Neo4j", icon: "neo4j" },
  { t: "Docker", icon: "docker" },
  { t: "GitHub", icon: "github" },
];

export const EDUCATION = [
  {
    h: "The University of Texas at Austin",
    org: "B.S. Computer Science and Neuroscience (X+CS Integrated Degree)",
    when: "Aug 2026 – May 2028 · Austin, TX",
    badge: "",
    mark: "UT",
    logo: "/media/logos/ut-austin.png",
    bullets: [],
  },
  {
    h: "A.D. Henderson University School & FAU High School",
    org: "Dual Enrollment at Florida Atlantic University · 100+ college credits, 4.0 GPA",
    when: "Aug 2022 – May 2026 · Boca Raton, FL",
    badge: "",
    mark: "FAU",
    logo: "/media/logos/fau.png",
    bullets: [
      "Relevant coursework: Data Structures & Algorithms, C/C++, Foundations of Computing, Matrix Theory.",
    ],
  },
];

export const EXPERIENCE = [
  {
    h: "AI Software Engineer Intern",
    org: "SIVOTEC Inc. · Boca Raton, FL",
    when: "May 2026 – Present",
    mark: "SV",
    logo: "/media/logos/sivotec.png",
    bullets: [
      "Built core stages of GENA 3.0, an AI tool recommending diagnoses to shorten rare patients' diagnostic odyssey.",
      "Increased HPO-normalization by 21% via a fine-tuned biomedical encoder (59K-term index); shipped to production.",
      "Designed a calibrated score-fusion reranker with an ontology-aware penalty for a ~3-pt recall gain (5-fold CV).",
      "Ran agentic-architecture ablations on component recall; cut a cross-encoder (6.6% Top-1 drop, 24× slower).",
    ],
  },
  {
    h: "Co-Founder",
    org: "Q-Beam Technologies (pre-seed medtech startup) · Austin, TX / Boca Raton, FL",
    when: "Jan 2026 – Present",
    mark: "QB",
    logo: "",
    bullets: [
      "Co-founded a patent-pending C-corp building the first preoperative planner (SaMD) for LITT brain-tumor ablation.",
      "Formulated optimizer as a QUBO/Ising model on D-Wave hardware, with AI tumor segmentation + surgeon editing.",
      "Drove an NSF SBIR Phase I application, Tech Runway incubator selection, and $100K+ in funding access.",
    ],
  },
  {
    h: "Biomechanics Undergraduate Researcher",
    org: "Florida Atlantic University, College of Engineering & Computer Science · Boca Raton, FL",
    when: "Jan 2025 – Jan 2026",
    mark: "FAU",
    logo: "/media/logos/fau.png",
    bullets: [
      "Trained a machine-learning model on 3D center-of-mass motion to predict loss of balance in real time.",
      "Built a live depth-camera pipeline driving the model, with a post-session balance score to flag at-risk patients.",
      "First-author publication (see below) validating a custom IMU motion sensor vs. the gold-standard optical system.",
    ],
  },
];

export const WORKS = [
  {
    n: "I",
    h: "Implied Volatility Surface Modeler",
    st: "Neural vol surface with no-arbitrage penalties, live",
    when: "May 2026",
    tech: ["Python", "PyTorch", "SciPy", "Plotly Dash"],
    bullets: [
      "Modeled the implied-vol surface with a 4-layer neural net over 876 live options via Black-Scholes IV inversion.",
      "Baked no-arbitrage (calendar + butterfly) penalties into training via autograd; deployed a live dashboard on Render.",
      "Added click-to-inspect Greeks and a vol-shock stress-test slider over a rotatable 3D Plotly surface.",
    ],
    shot: "/media/projects/volatility.jpg",
    live: "https://volatility-surface-calibrator.onrender.com/",
    repo: "https://github.com/samkitb/ImpliedVolatilitySurfaceModeler",
    demo: "https://youtu.be/Ddr6Vh4kRPk",
    note: "Hosted on Render's free tier, so the dashboard can take up to 60s to wake.",
  },
  {
    n: "II",
    h: "Research Connect AI",
    st: "GPT-4.1 professor search with live citations",
    when: "Aug 2024 – Dec 2025",
    tech: ["React", "TypeScript", "Flask", "MySQL", "OpenAI API"],
    bullets: [
      "Built and deployed a full-stack app (researchconnectai.com): GPT-4.1 professor search with live OpenAlex citations.",
      "Added JWT/bcrypt auth, a MySQL connection tracker, and a faculty-email scraper behind a Flask REST API.",
    ],
    shot: "/media/projects/researchconnect.jpg",
    live: "https://researchconnectai.com",
    repo: "https://github.com/samkitb/ResearchConnectAI",
    demo: "",
    note: "",
  },
  {
    /* BEPI research project, added 2026-07-23 from Samkit's copy. Poster is the
       real FAU research poster he sent (low-res, 816px). OPEN: exact date/year,
       a FAURJ paper URL for a "read it" link, and the survey question count
       (his write-up says 17, the poster says 15). */
    n: "III",
    h: "Gender Differences in Perceptions of AI on Social Media",
    st: "Survey study on gender and AI attitudes, published in FAURJ",
    when: "",
    tech: ["Survey Design", "IBM SPSS", "Chi-Square", "MTurk"],
    bullets: [
      "Designed a survey on public attitudes toward AI in social media (trust, misinformation, privacy, and AI-generated content) and collected 156 U.S. responses via Amazon Mechanical Turk.",
      "Analyzed the data in IBM SPSS with cross-tabulation and chi-square tests, framed by the Technology Acceptance Model and Risk Perception Theory; found statistically significant gender differences in attitudes toward AI integration and AI-generated misinformation.",
      "Wrote it into a peer-reviewed manuscript accepted to the Florida Atlantic Undergraduate Research Journal (FAURJ), and presented at FURC, NCUR, and the FAU Research Symposium (1st place).",
    ],
    shot: "/media/projects/bepi.jpg",
    live: "",
    repo: "",
    demo: "",
    note: "",
  },
  {
    n: "IV",
    h: "Health-JEPA / Cohort Compass",
    st: "Counterfactual outcome forecasting on NIH All of Us",
    when: "Feb 2026",
    tech: ["Python", "PyTorch", "Qdrant", "FastAPI"],
    bullets: [
      "Built an action-conditional JEPA on an NIH All of Us cohort (N = 4,269) for counterfactual outcome forecasting.",
      "Benchmarked against GBT/GRU/Transformer baselines; ablation flagged AdaLN-Zero as critical (R² 0.20 → 0.03 drop).",
      "Added Qdrant-backed counterfactual twin retrieval; one unified embedding matched tree baselines across 8 outcomes.",
    ],
    shot: "",
    live: "",
    repo: "",
    demo: "",
    note: "",
  },
];

/* Mini award cards. Titles are deliberately GENERIC (Samkit's choice — the
   specific FAU names read as less prestigious than they are); the descriptions
   carry the real scale and what each win unlocked.

   Copy is from Samkit (2026-07-23), lightly reworded. Facts he supplied:
   Biotech = 20 grad/undergrad teams, Q-Beam's first prototype. Business Pitch =
   FAU university-wide, Boca, 1st -> regional venture network + FAU Tech Runway.
   REEF = top-3 startup in Florida -> statewide VC/angel network. Health-JEPA 3rd
   at the All of Us hackathon (my inference). OURI = his BEPI polling research
   (BEPI = FAU's Business and Economics Polling Initiative). Prize $ left off. */
export type Award = { title: string; place: string; desc: string };

export const AWARDS: Award[] = [
  {
    title: "University Biotech Hackathon",
    place: "1st place",
    desc: "Won against 20 teams of graduate and undergraduate students. Built the first working prototype of Q-Beam's preoperative planner.",
  },
  {
    title: "Data Engineering Hackathon",
    place: "3rd place",
    desc: "Competed against 15 teams of graduate and undergraduate students. Built Health-JEPA, an action-conditional model forecasting patient outcomes across a 4,269-person NIH cohort.",
  },
  {
    title: "University Pitch Competition",
    place: "1st place",
    desc: "Took first at FAU's university-wide entrepreneurial pitch competition in Boca Raton, Florida, opening access to a regional venture network for funding and product development, plus a place in the FAU Tech Runway incubator.",
  },
  {
    title: "Statewide Startup Competition",
    place: "Top 3 statewide",
    desc: "Named a top-3 startup in the state of Florida, unlocking access to a statewide network of VC firms and angel investors.",
  },
  {
    title: "University Research Symposium",
    place: "1st place",
    desc: "Delivered a 15 minute oral presentation to a panel of judges on AI risk & safety in partnerhsip with FAU's Business and Economics Polling Initiative (BEPI). Took first place in the undergraduate category. "
  },
];

export const AWARD_ALSO = "Also presented at NCUR and FURC.";

export const PUBLICATION = {
  title:
    "A Brief Overview: The Utility of Wearable Motion Sensor Technology for Neurodegenerative Diseases",
  meta:
    "S. Bothra, et al. · Int'l Journal of Applied Sciences & Development, vol. 4, pp. 205–213, 2025",
  doi: "10.37394/232029.2025.4.22",
  /* Verbatim abstract, pulled from the Crossref record for this DOI (WSEAS).
     Samkit is first author, so this is his own text. */
  abstract:
    "Neurodegenerative diseases are conditions that affect a patient's motor function capabilities, hindering human movement, limiting the ability to perform activities of daily living (ADLs) and negatively impacting patient quality of life (QoL). Currently, clinical assessments are subjective in nature, and quantitative assessment would be an excellent supplemental tool to provide clinicians with support in clinical decision making. Inertial measurement units (IMUs) are unique sensor-based technologies with potential applicability as clinical assessment technology in patients with neurodegenerative diseases. Moreover, gold-standard motion capture (MOCAP) technology is expensive and limited to research-specific use, making it unavailable to patients and, therefore, impractical for clinical use. IMU sensor-based technology can track human movement in real-time, are cost-effective, and provide data to the clinician as a quantitative output. Thus, it is the aim of this paper to discuss the potential use of IMU sensors as a clinically relevant tool.",
};
