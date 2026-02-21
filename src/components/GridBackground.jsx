import { memo } from "react";

const GridBackground = memo(function GridBackground({
  gridSize = 94,
  lineColor = "rgba(255,255,255,0.07)",
  backgroundColor = "#050d1a",
  fade = false,
  className = "",
  children,
}) {
  const bgColor = backgroundColor.startsWith("[")
    ? backgroundColor.slice(1, -1)
    : backgroundColor;

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(${lineColor} 1px, transparent 1px),
          linear-gradient(90deg, ${lineColor} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundColor: bgColor,
      }}
    >
      {fade && (
        <>
          {/* Top fade */}
          <div
            className="absolute inset-x-0 top-0 h-32 pointer-events-none"
            style={{
              background: `linear-gradient(to bottom, ${bgColor}, transparent)`,
            }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${bgColor}, transparent)`,
            }}
          />
          {/* Left fade */}
          <div
            className="absolute inset-y-0 left-0 w-32 pointer-events-none"
            style={{
              background: `linear-gradient(to right, ${bgColor}, transparent)`,
            }}
          />
          {/* Right fade */}
          <div
            className="absolute inset-y-0 right-0 w-32 pointer-events-none"
            style={{
              background: `linear-gradient(to left, ${bgColor}, transparent)`,
            }}
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
});

export default GridBackground;
