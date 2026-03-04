import { Globe } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const RegionalPresence = () => {
  const regions = [
    {
      title: "United States",
      desc: "Primary trading operations and brokerage services",
    },
    {
      title: "International Network",
      desc: "Strategic partnerships across Europe, Asia, Africa, and the Americas",
    },
    {
      title: "Compliance",
      desc: "All operations conducted under NCND and strict KYC protocols",
    },
  ];

  return (
    <ScrollReveal delay={0.4}>
      <motion.div
        className="group relative h-full"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glass card */}
        <div className="relative h-full overflow-hidden rounded-sm transition-all duration-300">
          {/* Frosted glass background */}
          <div className="absolute inset-0 bg-card/50 backdrop-blur-md border-2 border-border/40 rounded-sm transition-all duration-300 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/5" />

          {/* Grain texture on card */}
          <div
            className="absolute inset-0 opacity-[0.12] pointer-events-none rounded-sm"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='regionalGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='200' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23regionalGrain)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                <Globe
                  className="w-6 h-6 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600/90"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground tracking-wide transition-colors duration-300 group-hover:text-orange-900">
                Regional Presence
              </h3>
            </div>

            {/* Regions list */}
            <div className="space-y-6">
              {regions.map((item, i) => (
                <div
                  key={item.title}
                  className="pb-6 border-b border-border/30 last:border-b-0 last:pb-0 transition-colors duration-300 group-hover:border-border/40"
                >
                  <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    {item.title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default RegionalPresence;
