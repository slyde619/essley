import ScrollReveal from "@/components/ScrollReveal";
import { steps } from "@/data/process";

const Process = () => {
  return (
    <main className="pt-24">
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Process
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Transaction Flow
              </h1>
              <div className="w-16 h-0.5 bg-primary mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Our six-stage transaction process ensures every deal is executed
                with precision, compliance, and full documentation at each
                milestone.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6">
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
