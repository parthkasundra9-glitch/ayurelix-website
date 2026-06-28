import React from "react";
import logoImg from "../assets/logo.png";

export default function Logo({
  size = "md",
  variant = "gold",
  showText = true,
  layout = "horizontal",
  className = ""
}) {
  // Height classes based on size prop (making them larger for visibility)
  const heights = {
    sm: "h-12 md:h-14",
    md: "h-16 md:h-20",
    lg: "h-20 md:h-28",
    xl: "h-28 md:h-36",
    xxl: "h-48 md:h-64"
  }[size] || "h-16 md:h-20";

  // Dimension classes for the font sizes
  const fontSizes = {
    sm: { title: "text-lg md:text-xl", tag: "text-[9px] md:text-[10px]" },
    md: { title: "text-xl md:text-2xl", tag: "text-[10px] md:text-[11px]" },
    lg: { title: "text-2xl md:text-3xl", tag: "text-[11px] md:text-[12px]" },
    xl: { title: "text-3xl md:text-5xl", tag: "text-[12px] md:text-[14px]" },
    xxl: { title: "text-5xl md:text-7xl", tag: "text-[16px] md:text-[18px]" }
  }[size] || { title: "text-xl md:text-2xl", tag: "text-[10px] md:text-[11px]" };

  const imgContent = (
    <img
      src={logoImg}
      alt="Ayurelix Wreath"
      className={`${heights} w-auto object-contain transition-transform duration-300 hover:scale-102`}
    />
  );

  if (layout === "iconOnly") {
    return <div className={`inline-flex items-center ${className}`}>{imgContent}</div>;
  }

  if (layout === "vertical") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        {imgContent}
        {showText && (
          <div className="flex flex-col items-center mt-3">
            <span
              className={`font-serif font-black tracking-wide leading-none text-[#1A2B49] ${fontSizes.title}`}
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Ayurelix
            </span>
            <span className={`tracking-[0.1em] text-[#B89355] uppercase mt-1.5 font-bold ${fontSizes.tag}`}>
              The Elixir of Ayurveda
            </span>
          </div>
        )}
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`flex items-center gap-3 md:gap-4 ${className}`}>
      {imgContent}
      {showText && (
        <div className="flex flex-col justify-center border-l border-gray-200/60 pl-3 md:pl-4">
          <span
            className={`font-serif font-black tracking-wide leading-none text-[#1A2B49] ${fontSizes.title}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Ayurelix
          </span>
          <span className={`tracking-[0.05em] text-[#B89355] leading-none mt-1.5 font-bold ${fontSizes.tag}`}>
            The Elixir of Ayurveda
          </span>
        </div>
      )}
    </div>
  );
}
