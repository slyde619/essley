import { LazyMotion, domAnimation, m } from "framer-motion";
import GridBackground from "@/components/GridBackground";

const BackgroundAnimations = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="fixed inset-0 z-0">
        <GridBackground
          gridSize={100}
          lineColor="rgba(234, 88, 12, 0.06)"
          backgroundColor="transparent"
          fade
          className="absolute inset-0"
        />
        {/* Secondary finer grid */}
        <div className="absolute inset-0 opacity-30">
          <GridBackground
            gridSize={50}
            lineColor="rgba(234, 88, 12, 0.03)"
            backgroundColor="transparent"
            className="absolute inset-0"
          />
        </div>

        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(234,88,12,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(234,88,12,0.05),transparent_50%)]" />

        {/* Animated gradient orbs */}
        <m.div
          className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <m.div
          className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <m.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
    </LazyMotion>
  );
};

export default BackgroundAnimations;
