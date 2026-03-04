import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Globe,
  ChevronRight,
  TrendingUp,
  Shield,
  Users,
  Award,
  FileText,
  CheckCircle,
  FileSignature,
  ClipboardCheck,
  Handshake,
  Ship,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Modal from "@/components/Modal";
import ProductsPortfolio from "@/components/ProductsPortfolio";
import GlobalReach from "@/components/GlobalReach";
import {
  headlines,
  heroImages,
  roleItems,
  processSteps,
  complianceItems,
} from "@/data/home";

const Index = () => {
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "mandate",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const openModal = (type) => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "mandate" });
  };

  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed rotating background images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHeadline}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentHeadline]}
              alt={`Hero ${currentHeadline + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/30 to-background/50" />
            <div className="absolute inset-0 bg-navy-deep/40" />
          </motion.div>
        </AnimatePresence>

        {/* Centered content */}
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <div className="h-[140px] sm:h-[120px] md:h-[100px] flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              <motion.h1
                key={currentHeadline}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight text-foreground drop-shadow-lg"
              >
                {headlines[currentHeadline]}
              </motion.h1>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md"
          >
            Essley Trading facilitates compliant, structured crude oil
            transactions between verified sellers and qualified international
            buyers across global markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => openModal("mandate")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
            >
              Submit Request
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => openModal("speak")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:border-primary/50 hover:text-primary bg-background/50 backdrop-blur-sm"
            >
              Speak With Our Team
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </section>

      {/* WHO WE ARE */}
      <section className="relative py-32 overflow-hidden bg-background">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

        {/* Fine grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.25] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' seed='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.35'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                    Who We Are
                  </h2>
                </div>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Essley Trading is a global oil and gas intermediary
                  specializing in the facilitation of structured crude oil
                  transactions. We connect verified sellers holding legitimate
                  mandates with qualified international buyers, ensuring every
                  transaction adheres to the highest standards of compliance,
                  confidentiality, and operational precision.
                </p>

                <Link
                  to="/about"
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-heading font-medium text-sm tracking-wide transition-all duration-200 hover:gap-3 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 relative" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Right Stats Grid */}
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: TrendingUp,
                    label: "Global Transactions",
                    description: "Facilitating deals across continents",
                  },
                  {
                    icon: Shield,
                    label: "100% Compliant",
                    description: "Full regulatory adherence",
                  },
                  {
                    icon: Users,
                    label: "Verified Network",
                    description: "Trusted buyers & sellers",
                  },
                  {
                    icon: Award,
                    label: "Industry Expertise",
                    description: "Seasoned professionals",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    {/* Glass card */}
                    <div className="relative h-full overflow-hidden rounded-sm transition-all duration-300">
                      {/* Frosted glass background */}
                      <div className="absolute inset-0 bg-card/60 backdrop-blur-md border-2 border-border/40 rounded-sm transition-all duration-300 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/5" />

                      {/* Grain texture on card */}
                      <div
                        className="absolute inset-0 opacity-[0.15] pointer-events-none rounded-sm"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cardGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cardGrain)' opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: "128px 128px",
                        }}
                      />

                      {/* Content */}
                      <div className="relative p-6 space-y-4">
                        <div className="w-10 h-10 flex items-center justify-center bg-foreground/5 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                          <stat.icon
                            className="w-5 h-5 text-foreground/70 transition-all duration-300 group-hover:scale-110 group-hover:text-orange-600/80"
                            strokeWidth={1.5}
                          />
                        </div>

                        <div>
                          <h3 className="font-heading text-sm font-semibold text-foreground mb-1.5 tracking-wide transition-colors duration-300 group-hover:text-orange-900">
                            {stat.label}
                          </h3>
                          <p className="text-xs text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/80">
                            {stat.description}
                          </p>
                        </div>
                      </div>

                      {/* Subtle hover accent */}
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* OUR ROLE PREVIEW */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629149/avi/seedream-4.5_Ultra-wide_cinematic_refinery_skyline_with_distillation_towers_and_pipe_networks-0_ua4uok.avif)",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background/70" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roleGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='8' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roleGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Our Role in Transactions
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {roleItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
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
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='roleCardGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='${i + 10}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23roleCardGrain)' opacity='0.4'/%3E%3C/svg%3E")`,
                        backgroundSize: "128px 128px",
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full flex flex-col p-10">
                      {/* Icon */}
                      <div className="mb-8">
                        <div className="w-12 h-12 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                          <item.icon
                            className="w-6 h-6 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-orange-600/90"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1 space-y-4">
                        <h3 className="font-heading text-lg font-semibold text-foreground tracking-wide leading-tight transition-colors duration-300 group-hover:text-orange-900">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Learn more link */}
                      <Link
                        to="/our-role"
                        className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-orange-600 font-medium transition-colors duration-200 mt-6"
                      >
                        Learn more <ChevronRight size={12} />
                      </Link>

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

      {/* PRODUCTS */}
      <ProductsPortfolio onSubmitMandate={() => openModal("mandate")} />

      {/* TRANSACTION PROCESS */}
      <section className="relative py-32 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629151/avi/seedream-4.5_Ultra-realistic_offshore_oil_drilling_platform_standing_in_calm_ocean_water_mass-0_llvrdv.avif)",
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/50 to-background/70" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='processGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.6' numOctaves='4' seed='12' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23processGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Transaction Process
              </h2>

              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our streamlined 6-step process ensures transparent, compliant,
                and efficient crude oil transactions
              </p>
            </div>
          </ScrollReveal>

          {/* Process steps grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: FileText },
                { icon: CheckCircle },
                { icon: FileSignature },
                { icon: ClipboardCheck },
                { icon: Handshake },
                { icon: Ship },
              ].map((item, index) => {
                const step = processSteps[index];
                return (
                  <ScrollReveal key={step.step} delay={index * 0.08}>
                    <motion.div
                      className="group relative h-full min-h-[280px]"
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
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='processCardGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.1' numOctaves='3' seed='${index + 20}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23processCardGrain)' opacity='0.4'/%3E%3C/svg%3E")`,
                            backgroundSize: "128px 128px",
                          }}
                        />

                        {/* Content */}
                        <div className="relative h-full flex flex-col p-8">
                          {/* Icon */}
                          <div className="mb-6">
                            <div className="w-11 h-11 flex items-center justify-center bg-foreground/8 backdrop-blur-sm transition-all duration-300 group-hover:bg-orange-500/10">
                              <item.icon
                                className="w-5 h-5 text-foreground/80 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-orange-600/90"
                                strokeWidth={1.5}
                              />
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="flex-1 space-y-3">
                            <h3 className="font-heading text-base font-semibold text-foreground tracking-wide leading-tight transition-colors duration-300 group-hover:text-orange-900">
                              {step.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/80">
                              {step.description}
                            </p>
                          </div>

                          {/* Step indicator */}
                          <div className="mt-6 pt-4 border-t border-border/30 transition-colors duration-300 group-hover:border-orange-500/20">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                {[...Array(6)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                      i === index
                                        ? "bg-orange-500 scale-125"
                                        : "bg-border/50 group-hover:bg-border/70"
                                    }`}
                                  />
                                ))}
                              </div>
                              <Link
                                to="/process"
                                className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground/5 hover:bg-orange-500/10 transition-all duration-200 group/arrow"
                              >
                                <ArrowRight className="w-3 h-3 text-foreground/60 group-hover/arrow:text-orange-600 transition-colors duration-200" />
                              </Link>
                            </div>
                          </div>

                          {/* Subtle bottom accent */}
                          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <GlobalReach />

      {/* CTA */}
      <section className="relative py-28 bg-muted/30 border-t border-border overflow-hidden">
        {/* Grain texture background */}
        <div
          className="absolute inset-0 opacity-[0.2] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='ctaGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.9' numOctaves='4' seed='20' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23ctaGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Engage With Verified Energy Counterparties
              </h2>
              <p className="text-muted-foreground mb-10 leading-relaxed">
                Begin a structured conversation with our brokerage team to
                explore mandate-backed crude oil transaction opportunities.
              </p>
              <button
                onClick={() => openModal("mandate")}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Submit Request
                <ArrowRight size={16} />
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MODAL */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </main>
  );
};

export default Index;
