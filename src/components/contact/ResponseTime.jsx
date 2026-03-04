import { Clock, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const ResponseTime = () => {
  const responseItems = [
    {
      title: "Buyer Mandates",
      desc: "Reviewed and responded to within 48 business hours",
    },
    {
      title: "General Inquiries",
      desc: "Initial response within 24 business hours",
    },
    {
      title: "Urgent Matters",
      desc: "WhatsApp available for time-sensitive communications",
    },
  ];

  return (
    <ScrollReveal delay={0.5}>
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='responseGrain'%3E%3CfeTurbulature type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='210' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23responseGrain)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col p-8 md:p-10">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                <Clock
                  className="w-6 h-6 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600/90"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground tracking-wide transition-colors duration-300 group-hover:text-orange-900">
                Response Time
              </h3>
            </div>

            {/* Response items */}
            <div className="space-y-6 flex-1">
              {responseItems.map((item, i) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-8 pt-6 border-t border-border/30 transition-colors duration-300 group-hover:border-border/40">
              <div className="flex items-start gap-2">
                <Shield
                  size={14}
                  className="text-orange-500 mt-0.5 shrink-0"
                  strokeWidth={1.5}
                />
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  All communications are subject to standard confidentiality
                  agreements and NCND protocols.
                </p>
              </div>
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default ResponseTime;
