import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { roles } from "@/data/roles";

const OurRole = () => {
  return (
    <main className="pt-24">
      <section className="relative py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629152/avi/seedream-4.5_Massive_oil_refinery_complex_at_dusk_transitioning_into_night_intricate_network_-0_bmvcz2.avif"
            alt="Oil Refinery Complex"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/50" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roleHeroGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roleHeroGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Our Role
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                The Intermediary Structure
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Essley Trading operates as a professional intermediary,
                connecting the gap between crude oil sellers and international
                buyers. We do not take ownership of product — we facilitate the
                transaction structure, documentation, and compliance framework
                that enables secure deal execution.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-28 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transaction Handling
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our comprehensive approach to facilitating crude oil transactions
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roles.map((role, index) => (
                <ScrollReveal key={role.title} delay={index * 0.08}>
                  <motion.div
                    className="group relative h-full min-h-[280px]"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Glass card */}
                    <div className="relative h-full overflow-hidden rounded-sm transition-all duration-300">
                      {/* Frosted glass background */}
                      <div className="absolute inset-0 bg-card/50 backdrop-blur-md border-2 border-border/40 rounded-sm transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/5" />

                      {/* Grain texture on card */}
                      <div
                        className="absolute inset-0 opacity-[0.12] pointer-events-none rounded-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roleCardGrain${index}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.1' numOctaves='3' seed='${index + 30}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roleCardGrain${index})' opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: "128px 128px",
                        }}
                      />

                      {/* Content */}
                      <div className="relative h-full flex flex-col p-8">
                        {/* Icon */}
                        <div className="mb-6">
                          <div className="w-11 h-11 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary/10">
                            <role.icon
                              className="w-5 h-5 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-primary"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>

                        {/* Text content */}
                        <div className="flex-1 space-y-3">
                          <h3 className="font-heading text-base font-semibold text-foreground tracking-wide leading-tight transition-colors duration-300 group-hover:text-primary">
                            {role.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/80">
                            {role.description}
                          </p>
                        </div>

                        {/* Step indicator */}
                        <div className="mt-6 pt-4 border-t border-border/30 transition-colors duration-300 group-hover:border-primary/20">
                          <div className="flex items-center gap-1.5">
                            {[...Array(6)].map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                  i === index
                                    ? "bg-primary scale-125"
                                    : "bg-border/50 group-hover:bg-border/70"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Subtle bottom accent */}
                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurRole;
