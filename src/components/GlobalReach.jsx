import { useState, useCallback, useMemo, memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const locations = [
  {
    id: "north-america",
    name: "North America",
    description:
      "Our extensive network enables us to connect verified buyers with reputable suppliers, refineries, and producers that meet specific requirements.",
    markerPosition: { x: 15, y: 30 },
  },
  {
    id: "europe",
    name: "Europe",
    description:
      "Strategic presence across major European markets with established partnerships in the UK, Germany, France, and the Netherlands.",
    markerPosition: { x: 48, y: 28 },
  },
  {
    id: "middle-east",
    name: "Middle East",
    description:
      "Deep-rooted connections in the Gulf region, facilitating trade with refineries and producers across UAE, Saudi Arabia, and Qatar.",
    markerPosition: { x: 58, y: 42 },
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    description:
      "Growing presence in key Asian markets including Singapore, China, and India, supporting regional trade and distribution.",
    markerPosition: { x: 78, y: 45 },
  },
  {
    id: "australia",
    name: "Australia",
    description:
      "Our extensive network enables us to connect verified buyers with reputable suppliers, refineries, and producers that meet specific requirements.",
    markerPosition: { x: 85, y: 72 },
  },
];

// Card position for desktop overlay (centered near bottom)
const CARD_POSITION = { x: 50, y: 78 };

// Custom hook for Intersection Observer (lazy loading)
function useInView(options = {}) {
  const [isInView, setIsInView] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasLoaded(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px",
        ...options,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView, hasLoaded };
}

// Memoized Region Overlay (Desktop only)
const RegionOverlay = memo(function RegionOverlay({
  location,
  isActive,
  isHovered,
  onLocationClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const markerX = location.markerPosition.x;
  const markerY = location.markerPosition.y;
  const isHighlighted = isActive || isHovered;

  return (
    <>
      {/* Clickable region */}
      <div
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          left: `${markerX - 8}%`,
          top: `${markerY - 8}%`,
          width: "16%",
          height: "16%",
          backgroundColor: isHighlighted
            ? "rgba(204, 85, 0, 0.25)"
            : "transparent",
        }}
        onClick={onLocationClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />

      {/* Marker */}
      <div
        className="absolute cursor-pointer transition-all duration-300 pointer-events-none"
        style={{
          left: `${markerX}%`,
          top: `${markerY}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Pulsing outer ring */}
        {isHighlighted && (
          <motion.div
            className="absolute w-8 h-8 rounded-full border-2"
            style={{
              borderColor: "hsl(25 100% 41% / 0.3)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
        {/* Inner dot */}
        <div
          className="w-4 h-4 rounded-full shadow-lg transition-all duration-300"
          style={{
            backgroundColor: isHighlighted
              ? "hsl(25 100% 41%)"
              : "hsl(25 100% 41% / 0.6)",
            boxShadow: isHighlighted
              ? "0 0 12px hsl(25 100% 41% / 0.4)"
              : "none",
          }}
        />
      </div>
    </>
  );
});

// Memoized Connection Line - desktop only
const ConnectionLine = memo(function ConnectionLine({ location }) {
  const x1 = location.markerPosition.x;
  const y1 = location.markerPosition.y;
  const x2 = CARD_POSITION.x;
  const y2 = CARD_POSITION.y - 5;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <line
        x1={`${x1}%`}
        y1={`${y1}%`}
        x2={`${x2}%`}
        y2={`${y2}%`}
        stroke="hsl(25 100% 41% / 0.4)"
        strokeWidth="1.5"
        className="transition-all duration-500"
      />
    </svg>
  );
});

// Memoized Info Card - overlay version for desktop only
const InfoCardOverlay = memo(function InfoCardOverlay({ location }) {
  return (
    <div
      className="absolute z-20 transition-all duration-500 ease-out animate-fade-in"
      style={{
        left: `${CARD_POSITION.x}%`,
        top: `${CARD_POSITION.y}%`,
        transform: "translate(-50%, 0)",
      }}
    >
      <div
        className="backdrop-blur-md border"
        style={{
          background: "hsl(220 30% 14% / 0.92)",
          borderColor: "hsl(25 100% 41% / 0.3)",
          maxWidth: "380px",
        }}
      >
        <div
          className="px-4 pt-4 pb-3 border-b"
          style={{ borderColor: "hsl(0 0% 100% / 0.1)" }}
        >
          <h3
            className="text-xl font-semibold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-foreground)",
            }}
          >
            {location.name}
          </h3>
        </div>
        <div className="px-4 pb-4 pt-2">
          <p
            className="text-xs leading-relaxed"
            style={{ color: "hsl(210 20% 75%)" }}
          >
            {location.description}
          </p>
        </div>
      </div>
    </div>
  );
});

// Loading Skeleton
const MapSkeleton = memo(function MapSkeleton() {
  return (
    <div
      className="relative w-full aspect-video overflow-hidden flex items-center justify-center"
      style={{ background: "var(--color-card)" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 rounded-full animate-spin"
          style={{
            borderColor: "hsl(25 100% 41% / 0.3)",
            borderTopColor: "hsl(25 100% 41%)",
          }}
        />
        <p
          style={{ color: "var(--color-muted-foreground)" }}
          className="text-sm"
        >
          Loading map...
        </p>
      </div>
    </div>
  );
});

// Helper function to get tooltip positioning
function getTooltipPosition(x, y) {
  let horizontal = {};
  let arrowHorizontal = {};

  if (x < 25) {
    horizontal = { left: "50%", transform: "translateX(-15%)" };
    arrowHorizontal = { left: "15%", transform: "translateX(-50%)" };
  } else if (x > 80) {
    horizontal = { right: "0", left: "auto", transform: "none" };
    arrowHorizontal = { right: "16px", left: "auto", transform: "none" };
  } else if (x > 70) {
    horizontal = { left: "50%", transform: "translateX(-75%)" };
    arrowHorizontal = { left: "75%", transform: "translateX(-50%)" };
  } else if (x < 30) {
    horizontal = { left: "50%", transform: "translateX(-25%)" };
    arrowHorizontal = { left: "25%", transform: "translateX(-50%)" };
  } else {
    horizontal = { left: "50%", transform: "translateX(-50%)" };
    arrowHorizontal = { left: "50%", transform: "translateX(-50%)" };
  }

  const isBottom = y > 60;
  const vertical = isBottom
    ? { bottom: "calc(100% + 8px)", top: "auto" }
    : { top: "calc(100% + 8px)", bottom: "auto" };

  return { horizontal, vertical, arrowHorizontal, isBottom };
}

// Mobile marker with tooltip
const MobileMarker = memo(function MobileMarker({
  location,
  isSelected,
  onClick,
}) {
  const { x, y } = location.markerPosition;
  const { horizontal, vertical, arrowHorizontal, isBottom } =
    getTooltipPosition(x, y);

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Marker dot */}
      <button
        onClick={onClick}
        className="w-5 h-5 rounded-full shadow-lg transition-all duration-200"
        style={{
          backgroundColor: isSelected
            ? "hsl(25 100% 41%)"
            : "hsl(25 100% 41% / 0.6)",
          border: "2px solid hsl(0 0% 100% / 0.8)",
          transform: isSelected ? "scale(1.25)" : "scale(1)",
          boxShadow: isSelected
            ? "0 0 12px hsl(25 100% 41% / 0.4)"
            : "0 4px 6px rgba(0,0,0,0.3)",
        }}
        aria-label={location.name}
      />

      {/* Tooltip */}
      {isSelected && (
        <div
          className="absolute z-20 w-52 animate-fade-in"
          style={{ ...horizontal, ...vertical }}
        >
          <div
            className="backdrop-blur-md shadow-xl p-3"
            style={{
              background: "hsl(220 30% 14% / 0.95)",
              border: "1px solid hsl(25 100% 41% / 0.3)",
            }}
          >
            <h4
              className="font-semibold text-sm mb-1"
              style={{
                color: "var(--color-foreground)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {location.name}
            </h4>
            <div className="max-h-24 overflow-y-auto scrollbar-thin">
              <p
                className="text-xs pr-1 leading-relaxed"
                style={{ color: "hsl(210 20% 70%)" }}
              >
                {location.description}
              </p>
            </div>
          </div>
          {/* Arrow */}
          <div
            className="absolute w-2 h-2 rotate-45"
            style={{
              background: "hsl(220 30% 14% / 0.95)",
              border: "1px solid hsl(25 100% 41% / 0.3)",
              borderTop: isBottom ? "none" : undefined,
              borderLeft: isBottom ? "none" : undefined,
              borderBottom: !isBottom ? "none" : undefined,
              borderRight: !isBottom ? "none" : undefined,
              ...(isBottom ? { bottom: "-5px" } : { top: "-5px" }),
              ...arrowHorizontal,
            }}
          />
        </div>
      )}
    </div>
  );
});

// Mobile Location List (pills)
const MobileLocationList = memo(function MobileLocationList({
  locations,
  selectedId,
  onSelect,
}) {
  const handleClick = (locationId) => {
    onSelect(selectedId === locationId ? null : locationId);
  };

  return (
    <div className="w-full px-4 mt-6">
      <div className="flex flex-wrap justify-center gap-2">
        {locations.map((location) => {
          const isSelected = selectedId === location.id;
          return (
            <button
              key={location.id}
              onClick={() => handleClick(location.id)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium border transition-all duration-200 active:scale-95"
              style={{
                backgroundColor: isSelected
                  ? "hsl(25 100% 41%)"
                  : "hsl(220 30% 14% / 0.5)",
                color: isSelected ? "white" : "var(--color-muted-foreground)",
                borderColor: isSelected
                  ? "hsl(25 100% 41%)"
                  : "hsl(25 100% 41% / 0.3)",
                boxShadow: isSelected
                  ? "0 10px 15px hsl(25 100% 41% / 0.25)"
                  : "none",
              }}
            >
              <MapPin
                className="w-4 h-4"
                style={{
                  color: isSelected ? "hsl(25 100% 60%)" : "hsl(25 100% 41%)",
                }}
              />
              {location.name}
            </button>
          );
        })}
      </div>
    </div>
  );
});

const GlobalReach = () => {
  const [activeLocation, setActiveLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mobileSelectedId, setMobileSelectedId] = useState(null);

  // Lazy loading hook
  const { ref: sectionRef, hasLoaded: isInView } = useInView();

  // Memoized handlers
  const handleLocationClick = useCallback((location) => {
    setActiveLocation((prev) => (prev?.id === location.id ? null : location));
  }, []);

  const handleMouseEnter = useCallback((location) => {
    setHoveredLocation(location);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredLocation(null);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleBackgroundClick = useCallback(() => {
    setActiveLocation(null);
  }, []);

  const handleMobileSelect = useCallback((id) => {
    setMobileSelectedId(id);
  }, []);

  const handleMobileMapClick = useCallback(() => {
    setMobileSelectedId(null);
  }, []);

  // Memoize current location
  const currentLocation = useMemo(
    () => activeLocation || hoveredLocation,
    [activeLocation, hoveredLocation],
  );

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Grain texture background */}
      <div
        className="absolute inset-0 opacity-[0.2] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='reachGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.7' numOctaves='4' seed='15' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23reachGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              Global Reach
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Our network spans across major crude oil producing regions and
              international markets, connecting West Africa, the Middle East,
              Europe, and Asia.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="relative max-w-6xl mx-auto">
            {!isInView ? (
              <MapSkeleton />
            ) : (
              <>
                {/* ── Desktop Interactive Map ── */}
                <div
                  className="relative w-full aspect-video overflow-hidden hidden md:block"
                  onClick={handleBackgroundClick}
                >
                  {/* Loading state */}
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div
                        className="w-10 h-10 border-4 rounded-full animate-spin"
                        style={{
                          borderColor: "hsl(25 100% 41% / 0.3)",
                          borderTopColor: "hsl(25 100% 41%)",
                        }}
                      />
                    </div>
                  )}

                  {/* Map Image */}
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet="/images/map-mobile.png"
                    />
                    <img
                      src="/images/map-desktop.png"
                      alt="World map showing global reach"
                      className="w-full h-full object-cover transition-opacity duration-500"
                      style={{
                        opacity: imageLoaded ? (activeLocation ? 0.5 : 0.7) : 0,
                      }}
                      loading="lazy"
                      decoding="async"
                      onLoad={handleImageLoad}
                    />
                  </picture>

                  {/* Interactive Overlays - Desktop only */}
                  {imageLoaded && (
                    <>
                      {locations.map((location) => (
                        <RegionOverlay
                          key={location.id}
                          location={location}
                          isActive={activeLocation?.id === location.id}
                          isHovered={hoveredLocation?.id === location.id}
                          onLocationClick={(e) => {
                            e.stopPropagation();
                            handleLocationClick(location);
                          }}
                          onMouseEnter={() => handleMouseEnter(location)}
                          onMouseLeave={handleMouseLeave}
                        />
                      ))}

                      {/* Connection Line */}
                      {currentLocation && (
                        <ConnectionLine location={currentLocation} />
                      )}

                      {/* Info Card Overlay */}
                      {currentLocation && (
                        <InfoCardOverlay location={currentLocation} />
                      )}
                    </>
                  )}
                </div>

                {/* ── Mobile Interactive Map with Markers ── */}
                <div
                  className="relative w-full aspect-video overflow-visible md:hidden"
                  onClick={handleMobileMapClick}
                >
                  <picture>
                    <source srcSet="/images/map-mobile.png" />
                    <img
                      src="/images/map-desktop.png"
                      alt="World map showing global reach"
                      className="w-full h-full object-cover"
                      style={{ opacity: 0.6 }}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>

                  {/* Mobile Markers with Tooltips */}
                  {locations.map((location) => (
                    <MobileMarker
                      key={location.id}
                      location={location}
                      isSelected={mobileSelectedId === location.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMobileSelect(
                          mobileSelectedId === location.id ? null : location.id,
                        );
                      }}
                    />
                  ))}
                </div>

                {/* Mobile Location Pills */}
                <div className="md:hidden">
                  <MobileLocationList
                    locations={locations}
                    selectedId={mobileSelectedId}
                    onSelect={handleMobileSelect}
                  />
                </div>
              </>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default GlobalReach;
