import { Clock, Shield } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
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
    <LazyMotion features={domAnimation}>
      <ScrollReveal delay={0.6}>
        <m.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative"
        >
          {/* Glow */}
          <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-primary/80 rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-border bg-card/80 backdrop-blur-sm h-full flex flex-col hover:border-primary/30 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center shrink-0">
                <Clock size={20} className="sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-foreground">
                Response Time
              </h3>
            </div>

            <div className="space-y-4 sm:space-y-6 grow">
              {responseItems.map((item, i) => (
                <m.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  className="flex items-start gap-3 sm:gap-4"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 sm:mt-2 shrink-0 animate-pulse" />
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-foreground mb-1">
                      {item.title}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border"
            >
              <div className="flex items-start gap-2">
                <Shield size={12} className="sm:w-3.5 sm:h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-[0.7rem] sm:text-xs text-muted-foreground italic leading-relaxed">
                  All communications are subject to standard confidentiality
                  agreements and NCND protocols.
                </p>
              </div>
            </m.div>
          </div>
        </m.div>
      </ScrollReveal>
    </LazyMotion>
  );
};

export default ResponseTime;
