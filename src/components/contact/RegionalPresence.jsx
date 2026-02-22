import { Globe } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
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
    <LazyMotion features={domAnimation}>
      <ScrollReveal delay={0.5}>
        <m.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative"
        >
          {/* Glow */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary/90 to-primary/70 rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-primary/90 to-primary/70 flex items-center justify-center shrink-0">
                <Globe size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Regional Presence
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {regions.map((item, i) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className="pb-4 sm:pb-6 border-b border-border last:border-b-0 last:pb-0"
                >
                  <p className="text-xs sm:text-sm font-bold text-foreground mb-1.5 sm:mb-2 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {item.title}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-3.5">
                    {item.desc}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </m.div>
      </ScrollReveal>
    </LazyMotion>
  );
};

export default RegionalPresence;
