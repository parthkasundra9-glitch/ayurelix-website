import React from "react";
import logoImg from "../assets/logo.png";

export default function Logo({
  size = "md",
  variant = "gold",
  showText = true,
  layout = "horizontal",
  className = ""
}) {
  // Height classes based on size prop (making them larger as requested, keeping mobile compact but clear)
  const heights = {
    sm: "h-[56px] md:h-[88px]",
    md: "h-[68px] md:h-[96px]",
    lg: "h-[88px] md:h-[130px]",
    xl: "h-[110px] md:h-[160px]",
    xxl: "h-[170px] md:h-[240px]"
  }[size] || "h-[68px] md:h-[96px]";

  // Dimension classes for the font sizes
  const fontSizes = {
    sm: { title: "text-lg md:text-2xl", tag: "text-[8px] md:text-[11px]" },
    md: { title: "text-xl md:text-3xl", tag: "text-[9px] md:text-[12px]" },
    lg: { title: "text-2xl md:text-4xl", tag: "text-[11px] md:text-[14px]" },
    xl: { title: "text-3xl md:text-5xl", tag: "text-[13px] md:text-[18px]" },
    xxl: { title: "text-5xl md:text-7xl", tag: "text-[18px] md:text-[24px]" }
  }[size] || { title: "text-xl md:text-3xl", tag: "text-[9px] md:text-[12px]" };

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
