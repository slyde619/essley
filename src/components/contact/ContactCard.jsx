import { LazyMotion, domAnimation, m } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const ContactCard = ({ contact, index }) => {
  const IconComponent = contact.icon;

  return (
    <LazyMotion features={domAnimation}>
      <ScrollReveal delay={index * 0.1}>
        <m.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            y: -10,
            transition: { duration: 0.3 },
          }}
          className="group relative h-full"
        >
          {/* Glow effect */}
          <div
            className={`absolute -inset-0.5 bg-linear-to-r ${contact.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
          />

          {/* Card */}
          <div className="relative p-6 sm:p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 h-full backdrop-blur-sm">
            {/* Top gradient bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${contact.gradient} rounded-t-2xl`}
            />

            <div className="flex flex-col h-full">
              <m.div
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br ${contact.gradient} flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden`}
                whileHover={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.1,
                }}
                transition={{ duration: 0.5 }}
              >
                <IconComponent size={20} className="sm:w-6 sm:h-6 text-white relative z-10" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
              </m.div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-3 sm:mb-4 group-hover:text-primary transition-colors duration-300">
                {contact.title}
              </h3>

              <div className="space-y-1.5 sm:space-y-2 mt-auto">
                {contact.details.map((detail) => (
                  <p
                    key={detail}
                    className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                  >
                    {detail}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom shine effect */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </m.div>
      </ScrollReveal>
    </LazyMotion>
  );
};

export default ContactCard;
