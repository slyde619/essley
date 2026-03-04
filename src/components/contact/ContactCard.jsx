import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const ContactCard = ({ contact, index }) => {
  const IconComponent = contact.icon;

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className="group relative h-full min-h-[200px]"
        whileHover={{ scale: 1.03 }}
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
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='contactGrain${index}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='${index + 100}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23contactGrain${index})' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: "128px 128px",
            }}
          />

          {/* Content */}
          <div className="relative h-full flex flex-col p-8">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                <IconComponent
                  className="w-6 h-6 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600/90"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-3">
              <h3 className="font-heading text-base font-semibold text-foreground tracking-wide leading-tight transition-colors duration-300 group-hover:text-orange-900">
                {contact.title}
              </h3>
              <div className="space-y-1.5">
                {contact.details.map((detail) => (
                  <p
                    key={detail}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default ContactCard;
