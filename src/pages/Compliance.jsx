import { Shield, Eye, Lock, Scale, FileWarning, Gavel } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const policies = [
  {
    icon: Eye,
    title: "Know Your Customer (KYC)",
    items: [
      "Comprehensive identity verification for all principals and signatories",
      "Corporate registration and beneficial ownership verification",
      "Cross-referencing against international sanctions and PEP databases",
      "Ongoing monitoring throughout the transaction lifecycle",
    ],
  },
  {
    icon: Shield,
    title: "Anti-Money Laundering (AML)",
    items: [
      "Source of funds verification for all financial instruments",
      "Transaction pattern analysis and risk scoring",
      "Compliance with FATF recommendations and local regulations",
      "Suspicious activity reporting protocols",
    ],
  },
  {
    icon: Scale,
    title: "Risk Management Framework",
    items: [
      "Counterparty risk assessment before engagement",
      "Financial instrument authentication and validation",
      "Market exposure and pricing risk evaluation",
      "Operational risk mitigation through structured procedures",
    ],
  },
  {
    icon: Lock,
    title: "Confidentiality Protocols",
    items: [
      "Mandatory NDA execution before information disclosure",
      "Secure document handling and transmission",
      "Information compartmentalization between parties",
      "Data retention and destruction policies",
    ],
  },
  {
    icon: FileWarning,
    title: "Anti-Circumvention",
    items: [
      "Strict NCNDA/IMFPA enforcement across all transactions",
      "Chain of intermediary documentation and protection",
      "Legal remedies for circumvention attempts",
      "Commission and fee structure transparency",
    ],
  },
  {
    icon: Gavel,
    title: "Ethical Trading Code",
    items: [
      "Zero tolerance for fraudulent documentation",
      "Adherence to international trade sanctions and embargoes",
      "Environmental and social governance considerations",
      "Fair dealing principles with all counterparties",
    ],
  },
];

const Compliance = () => {
  return (
    <main className="pt-24">
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Compliance
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Regulatory Compliance & Risk Control
              </h1>
              <div className="w-16 h-0.5 bg-primary mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Essley Trading maintains an uncompromising commitment to
                regulatory compliance. Every transaction we facilitate is
                subject to comprehensive due diligence, risk assessment, and
                adherence to international trade regulations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policies.map((policy, i) => (
              <ScrollReveal key={policy.title} delay={i * 0.1}>
                <div className="p-8 rounded-lg border border-border bg-card h-full">
                  <policy.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                    {policy.title}
                  </h3>
                  <ul className="space-y-3">
                    {policy.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Compliance;
