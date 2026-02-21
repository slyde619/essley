import ScrollReveal from "@/components/ScrollReveal";
import { roles } from "@/data/roles";

const OurRole = () => {
  return (
    <main className="pt-24">
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Our Role
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                The Intermediary Structure
              </h1>
              <div className="w-16 h-0.5 bg-primary mb-8" />
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
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Transaction Handling
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <ScrollReveal key={role.title} delay={i * 0.1}>
                <div className="group p-8 rounded-lg border border-border bg-background hover:border-primary/30 transition-all duration-500 h-full">
                  <role.icon className="w-10 h-10 text-primary mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default OurRole;
