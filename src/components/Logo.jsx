import React from "react";

export default function Logo({
  size = "md",
  variant = "gold",
  showText = true,
  layout = "horizontal",
  className = ""
}) {
  // Dimensions based on size prop
  const dims = {
    sm: { width: 36, height: 36, fontSize: "text-lg" },
    md: { width: 54, height: 54, fontSize: "text-2xl" },
    lg: { width: 72, height: 72, fontSize: "text-3xl" },
    xl: { width: 120, height: 120, fontSize: "text-5xl" },
    xxl: { width: 240, height: 240, fontSize: "text-7xl" }
  }[size] || { width: 54, height: 54, fontSize: "text-2xl" };

  // Color theme definitions
  const colors = {
    gold: {
      navy: "#0E1A30",
      gold: "#C5A059",
      white: "#ffffff",
      textClass: "text-[#0E1A30]"
    },
    navy: {
      navy: "#0E1A30",
      gold: "#0E1A30",
      white: "#0E1A30",
      textClass: "text-[#0E1A30]"
    },
    white: {
      navy: "#ffffff",
      gold: "#ffffff",
      white: "#ffffff",
      textClass: "text-white"
    }
  }[variant] || {
    navy: "#0E1A30",
    gold: "#C5A059",
    white: "#ffffff",
    textClass: "text-[#0E1A30]"
  };

  const svgContent = (
    <svg
      width={dims.width}
      height={dims.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 hover:scale-105"
    >
      {/* Outer Wreath - Gold Leaf Pattern */}
      <g>
        {/* Left Branch */}
        <path
          d="M 50,85 C 30,83 18,65 18,48 C 18,31 30,17 48,15"
          stroke={colors.gold}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Right Branch */}
        <path
          d="M 50,85 C 70,83 82,65 82,48 C 82,31 70,17 52,15"
          stroke={colors.gold}
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Wreath Leaves */}
        {/* Left Leaves */}
        <path d="M 45,84 C 40,84 38,80 40,77 C 42,74 46,75 48,79 C 48,82 47,84 45,84 Z" fill={colors.gold} />
        <path d="M 33,80 C 28,78 26,73 29,70 C 32,67 36,69 36,74 C 36,77 35,79 33,80 Z" fill={colors.gold} />
        <path d="M 23,71 C 19,68 18,62 21,59 C 24,56 28,59 27,64 C 27,67 25,70 23,71 Z" fill={colors.gold} />
        <path d="M 18,60 C 15,56 15,50 19,48 C 22,46 25,49 24,54 C 23,57 21,59 18,60 Z" fill={colors.gold} />
        <path d="M 17,47 C 15,42 16,36 20,34 C 23,32 26,36 24,40 C 23,43 20,46 17,47 Z" fill={colors.gold} />
        <path d="M 22,34 C 20,29 23,24 27,23 C 31,22 32,26 30,30 C 29,33 25,35 22,34 Z" fill={colors.gold} />
        <path d="M 30,24 C 30,19 34,15 38,15 C 42,15 42,19 39,22 C 37,25 33,26 30,24 Z" fill={colors.gold} />
        <path d="M 41,17 C 42,12 47,10 50,11 C 53,12 52,17 48,19 C 45,20 42,19 41,17 Z" fill={colors.gold} />

        {/* Right Leaves */}
        <path d="M 55,84 C 60,84 62,80 60,77 C 58,74 54,75 52,79 C 52,82 53,84 55,84 Z" fill={colors.gold} />
        <path d="M 67,80 C 72,78 74,73 71,70 C 68,67 64,69 64,74 C 64,77 65,79 67,80 Z" fill={colors.gold} />
        <path d="M 77,71 C 81,68 82,62 79,59 C 76,56 72,59 73,64 C 73,67 75,70 77,71 Z" fill={colors.gold} />
        <path d="M 82,60 C 85,56 85,50 81,48 C 78,46 75,49 76,54 C 77,57 79,59 82,60 Z" fill={colors.gold} />
        <path d="M 83,47 C 85,42 84,36 80,34 C 77,32 74,36 76,40 C 77,43 80,46 83,47 Z" fill={colors.gold} />
        <path d="M 78,34 C 80,29 77,24 73,23 C 69,22 68,26 70,30 C 71,33 75,35 78,34 Z" fill={colors.gold} />
        <path d="M 70,24 C 70,19 66,15 62,15 C 58,15 58,19 61,22 C 63,25 67,26 70,24 Z" fill={colors.gold} />
        <path d="M 59,17 C 58,12 53,10 50,11 C 47,12 48,17 52,19 C 55,20 58,19 59,17 Z" fill={colors.gold} />
      </g>

      {/* Central "A" and Leaf Motif */}
      <g>
        {/* The Serif A Body */}
        <path
          d="M 36,70 L 47,26 C 48,22 52,22 53,26 L 64,70 M 39,63 L 61,63"
          stroke={colors.navy}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left leg serif */}
        <path d="M 32,70 L 40,70" stroke={colors.navy} strokeWidth="5" strokeLinecap="round" />
        {/* Right leg serif */}
        <path d="M 60,70 L 68,70" stroke={colors.navy} strokeWidth="5" strokeLinecap="round" />

        {/* Leaf 1 (Left-leaning inner leaf) */}
        <path
          d="M 50,38 C 42,44 42,56 50,60 C 51,54 48,46 50,38 Z"
          fill={colors.navy}
        />
        {/* Leaf 2 (Right-leaning overlapping leaf) */}
        <path
          d="M 50,44 C 58,49 56,59 48,61 C 49,55 53,50 50,44 Z"
          fill={colors.navy}
          opacity="0.9"
        />
      </g>
    </svg>
  );

  if (layout === "iconOnly" || !showText) {
    return <div className={`inline-flex items-center justify-center ${className}`}>{svgContent}</div>;
  }

  if (layout === "vertical") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        {svgContent}
        <span
          className={`mt-3 font-serif font-bold tracking-wide leading-none ${dims.fontSize} ${colors.textClass}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Ayurelix
        </span>
        <span className="text-[10px] tracking-[0.3em] text-[#C5A059] uppercase mt-1">
          Ancient Ayurveda • Modern Wellness
        </span>
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {svgContent}
      <div className="flex flex-col">
        <span
          className={`font-serif font-bold tracking-wide leading-none ${dims.fontSize} ${colors.textClass}`}
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Ayurelix
        </span>
        <span className="text-[9px] tracking-[0.2em] text-[#C5A059] uppercase leading-none mt-1">
          Wellness
        </span>
      </div>
    </div>
  );
}
