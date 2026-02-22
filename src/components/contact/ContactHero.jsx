import { LazyMotion, domAnimation, m } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const ContactHero = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="py-12 sm:py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4 sm:mb-6 leading-[1.1] px-4"
              >
                Get in Touch
              </m.h1>

              <m.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-20 sm:w-24 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-6 sm:mb-8"
              />

              <m.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto px-4"
              >
                Engage with our brokerage team to discuss crude oil transaction
                opportunities. All inquiries are treated with strict
                confidentiality.
              </m.p>
            </m.div>
          </ScrollReveal>
        </div>
      </section>
    </LazyMotion>
  );
};

export default ContactHero;
