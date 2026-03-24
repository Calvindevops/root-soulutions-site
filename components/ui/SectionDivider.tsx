interface SectionDividerProps {
  topColor: string;
  bottomColor: string;
  variant: "leaf-wave" | "root-pattern";
  flip?: boolean;
}

export function SectionDivider({ topColor, bottomColor, variant, flip = false }: SectionDividerProps) {
  if (variant === "leaf-wave") {
    return (
      <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} style={{ backgroundColor: bottomColor }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px] block"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main wave */}
          <path
            d="M0,40 C120,65 240,10 360,40 C480,70 600,15 720,40 C840,65 960,10 1080,40 C1200,70 1320,15 1440,40 L1440,0 L0,0 Z"
            fill={topColor}
          />
          {/* Leaf accents */}
          <g fill={topColor} opacity="0.6">
            {/* Leaf 1 */}
            <path d="M180,35 C185,25 195,25 200,35 C195,30 185,30 180,35 Z" />
            {/* Leaf 2 */}
            <path d="M540,20 C545,10 555,10 560,20 C555,15 545,15 540,20 Z" />
            {/* Leaf 3 */}
            <path d="M900,35 C905,25 915,25 920,35 C915,30 905,30 900,35 Z" />
            {/* Leaf 4 */}
            <path d="M1260,20 C1265,10 1275,10 1280,20 C1275,15 1265,15 1260,20 Z" />
          </g>
          {/* Small vine stems */}
          <g stroke={topColor} strokeWidth="1.5" fill="none" opacity="0.4">
            <path d="M190,35 L190,45" />
            <path d="M550,20 L550,30" />
            <path d="M910,35 L910,45" />
            <path d="M1270,20 L1270,30" />
          </g>
        </svg>
      </div>
    );
  }

  // Root/Beet pattern
  return (
    <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`} style={{ backgroundColor: bottomColor }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-[60px] md:h-[80px] block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Organic root wave base */}
        <path
          d="M0,30 C60,50 120,20 180,35 C240,50 300,15 360,30 C420,45 480,20 540,35 C600,50 660,15 720,30 C780,45 840,20 900,35 C960,50 1020,15 1080,30 C1140,45 1200,20 1260,35 C1320,50 1380,15 1440,30 L1440,0 L0,0 Z"
          fill={topColor}
        />
        {/* Root tendrils hanging down */}
        <g fill={topColor} opacity="0.5">
          {/* Root 1 */}
          <path d="M120,35 Q125,55 120,70 Q118,55 115,35 Z" />
          {/* Root 2 */}
          <path d="M360,30 Q365,48 362,62 Q358,48 355,30 Z" />
          {/* Root 3 — beet shape */}
          <path d="M600,35 Q610,50 605,65 Q600,55 595,65 Q590,50 600,35 Z" />
          {/* Root 4 */}
          <path d="M840,35 Q845,52 842,68 Q838,52 835,35 Z" />
          {/* Root 5 — beet shape */}
          <path d="M1080,30 Q1090,45 1085,58 Q1080,50 1075,58 Q1070,45 1080,30 Z" />
          {/* Root 6 */}
          <path d="M1320,35 Q1325,50 1322,65 Q1318,50 1315,35 Z" />
        </g>
        {/* Tiny root hairs */}
        <g stroke={topColor} strokeWidth="1" fill="none" opacity="0.3">
          <path d="M118,50 L112,58" />
          <path d="M122,48 L128,55" />
          <path d="M358,42 L352,50" />
          <path d="M362,40 L368,48" />
          <path d="M838,48 L832,56" />
          <path d="M842,46 L848,54" />
          <path d="M1318,42 L1312,50" />
          <path d="M1322,40 L1328,48" />
        </g>
      </svg>
    </div>
  );
}
