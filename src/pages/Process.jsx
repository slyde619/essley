import ScrollReveal from "@/components/ScrollReveal";
import { steps } from "@/data/process";

const Process = () => {
  return (
    <main className="pt-24">
      <section className="relative py-28 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629153/avi/seedream-4.5_Ultra-realistic_aerial_view_of_a_large_coastal_oil_storage_terminal_multiple_mas-0_hw5utx.avif)",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/50" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='processGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='30' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23processGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Process
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Transaction Flow
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Our six-stage transaction process ensures every deal is executed
                with precision, compliance, and full documentation at each
                milestone.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden">
        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='stepsGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.7' numOctaves='4' seed='35' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23stepsGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto space-y-12">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 0.1}>
                <div className="flex gap-8">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-primary bg-secondary flex items-center justify-center font-heading text-lg font-bold text-primary">
                      {step.step}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-4" />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div>
                      <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
                        Key Documents
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {step.documents.map((doc) => (
                          <span
                            key={doc}
                            className="text-xs px-3 py-1.5 rounded-md bg-secondary text-muted-foreground border border-border"
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Process;
