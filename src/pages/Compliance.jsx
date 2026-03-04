import { Shield, Eye, Lock, Scale, FileWarning, Gavel } from "lucide-react";
import { motion } from "framer-motion";
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
    <main className="relative pt-24 overflow-hidden">
      {/* Background Image - spans entire page */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629152/avi/seedream-4.5_Massive_oil_pipeline_terminal_near_coastline_during_nightfall_pipelines_stretchi-0_1_noznjf.avif)'
        }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/30 to-background/50" />
      </div>

      {/* Grain texture overlay - spans entire page */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='complianceGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='50' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23complianceGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <section className="relative py-28">
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Compliance
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Regulatory Compliance & Risk Control
              </h1>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative pb-28">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {policies.map((policy, i) => (
              <ScrollReveal key={policy.title} delay={i * 0.1}>
                <motion.div
                  className="group relative h-full min-h-[340px]"
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
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='complianceCardGrain${i}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='${i + 40}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23complianceCardGrain${i})' opacity='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: "128px 128px",
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col p-10">
                      {/* Icon */}
                      <div className="mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                          <policy.icon
                            className="w-6 h-6 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-orange-600/90"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 space-y-4">
                        <h3 className="font-heading text-lg font-semibold text-foreground tracking-wide leading-tight transition-colors duration-300 group-hover:text-orange-900">
                          {policy.title}
                        </h3>
                        <ul className="space-y-3">
                          {policy.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Subtle bottom accent */}
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Compliance;
