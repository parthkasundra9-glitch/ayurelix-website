import React from "react";
import logoImg from "../assets/logo.png";

export default function Logo({
  size = "md",
  variant = "gold",
  showText = true,
  layout = "horizontal",
  className = ""
}) {
  // Height classes based on size prop (making them 30-40% larger as requested, keeping mobile compact)
  const heights = {
    sm: "h-11 md:h-22",
    md: "h-26 md:h-32",
    lg: "h-36 md:h-44",
    xl: "h-46 md:h-58",
    xxl: "h-78 md:h-100"
  }[size] || "h-26 md:h-32";

  // Dimension classes for the font sizes (making tagline noticeably smaller)
  const fontSizes = {
    sm: { title: "text-sm md:text-base", tag: "text-[5.5px] md:text-[6.5px]" },
    md: { title: "text-base md:text-lg", tag: "text-[6.5px] md:text-[7.5px]" },
    lg: { title: "text-lg md:text-xl", tag: "text-[7.5px] md:text-[8.5px]" },
    xl: { title: "text-xl md:text-2xl", tag: "text-[8.5px] md:text-[9.5px]" },
    xxl: { title: "text-3xl md:text-4xl", tag: "text-[10px] md:text-[12px]" }
  }[size] || { title: "text-base md:text-lg", tag: "text-[6.5px] md:text-[7.5px]" };

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
