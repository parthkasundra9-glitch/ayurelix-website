import React from "react";
import logoImg from "../assets/logo.jpg";

export default function Logo({
  size = "md",
  variant = "gold",
  showText = true,
  layout = "horizontal",
  className = ""
}) {
  // Height classes based on size prop
  const heights = {
    sm: "h-8",
    md: "h-12",
    lg: "h-16",
    xl: "h-24",
    xxl: "h-36"
  }[size] || "h-12";

  const imgContent = (
    <img
      src={logoImg}
      alt="Ayurelix"
      className={`${heights} w-auto object-contain mix-blend-multiply transition-transform duration-300 hover:scale-102`}
    />
  );

  if (layout === "iconOnly" || !showText) {
    return <div className={`inline-flex items-center ${className}`}>{imgContent}</div>;
  }

  if (layout === "vertical") {
    return (
      <div className={`flex flex-col items-center justify-center text-center ${className}`}>
        {imgContent}
        <span className="text-[10px] tracking-[0.1em] text-[#B89355] uppercase mt-2 font-medium">
          The Elixir of Ayurveda
        </span>
      </div>
    );
  }

  // Default: horizontal
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {imgContent}
      {showText && (
        <span className="text-[10px] tracking-[0.1em] text-[#B89355] uppercase pl-3 border-l border-gray-200/50 leading-none">
          The Elixir of Ayurveda
        </span>
      )}
    </div>
  );
}
