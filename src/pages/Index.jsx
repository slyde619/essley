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
            <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/70 to-background/90" />
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
      <section className="relative py-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-card via-background to-card/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb,59,130,246),0.05),transparent_50%)]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <ScrollReveal>
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                    Who We Are
                  </h2>
                  <div className="w-20 h-1 bg-linear-to-r from-primary to-primary/40 mb-8" />
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    Essley Trading is a global oil and gas intermediary
                    specializing in the facilitation of structured crude oil
                    transactions. We connect verified sellers holding legitimate
                    mandates with qualified international buyers, ensuring every
                    transaction adheres to the highest standards of compliance,
                    confidentiality, and operational precision.
                  </p>

                  <Link
                    to="/about"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
                  >
                    Learn More About Us
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Right Stats Grid */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    icon: TrendingUp,
                    label: "Global Transactions",
                    description: "Facilitating deals across continents",
                    gradient: "from-blue-500/10 to-blue-600/5",
                  },
                  {
                    icon: Shield,
                    label: "100% Compliant",
                    description: "Full regulatory adherence",
                    gradient: "from-green-500/10 to-green-600/5",
                  },
                  {
                    icon: Users,
                    label: "Verified Network",
                    description: "Trusted buyers & sellers",
                    gradient: "from-purple-500/10 to-purple-600/5",
                  },
                  {
                    icon: Award,
                    label: "Industry Expertise",
                    description: "Seasoned professionals",
                    gradient: "from-amber-500/10 to-amber-600/5",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    className="group relative"
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${stat.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    />
                    <div className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 h-full">
                      <stat.icon className="w-8 h-8 text-primary mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                      <h3 className="font-heading text-base font-bold text-foreground mb-2">
                        {stat.label}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {stat.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* OUR ROLE PREVIEW */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Our Role in Transactions
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roleItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.15}>
                <div className="group p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-500">
                  <item.icon className="w-10 h-10 text-primary mb-6 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="text-center mt-12">
              <Link
                to="/our-role"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Learn more about our role <ChevronRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCTS */}
      <ProductsPortfolio onSubmitMandate={() => openModal("mandate")} />

      {/* TRANSACTION PROCESS */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-linear-to-b from-background via-card/30 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(var(--primary-rgb,59,130,246),0.08),transparent_60%)]" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Transaction Process
                </h2>
                <div className="w-24 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-6" />
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Our streamlined 6-step process ensures transparent, compliant,
                  and efficient crude oil transactions
                </p>
              </motion.div>
            </div>
          </ScrollReveal>

          {/* Process steps grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: FileText,
                  gradient: "from-primary/90 to-primary/70",
                  opacity: "20",
                },
                {
                  icon: CheckCircle,
                  gradient: "from-primary to-primary/80",
                  opacity: "25",
                },
                {
                  icon: FileSignature,
                  gradient: "from-primary/80 to-primary/60",
                  opacity: "22",
                },
                {
                  icon: ClipboardCheck,
                  gradient: "from-primary via-primary/90 to-primary/70",
                  opacity: "24",
                },
                {
                  icon: Handshake,
                  gradient: "from-primary/95 to-primary/75",
                  opacity: "23",
                },
                {
                  icon: Ship,
                  gradient: "from-primary to-primary/85",
                  opacity: "26",
                },
              ].map((item, index) => {
                const step = processSteps[index];
                return (
                  <ScrollReveal key={step.step} delay={index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        y: -12,
                        rotateX: 5,
                        transition: { duration: 0.3 },
                      }}
                      className="group relative"
                      style={{
                        transformStyle: "preserve-3d",
                        perspective: "1000px",
                      }}
                    >
                      {/* Glow effect on hover */}
                      <div
                        className={`absolute -inset-0.5 bg-linear-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-${item.opacity} blur-xl transition-all duration-500`}
                      />

                      {/* Card */}
                      <div className="relative h-full bg-card border border-border rounded-2xl overflow-hidden backdrop-blur-sm">
                        {/* Top gradient bar */}
                        <div
                          className={`h-1.5 bg-linear-to-r ${item.gradient}`}
                        />

                        <div className="p-8">
                          {/* Icon and step number */}
                          <div className="flex items-start justify-between mb-6">
                            <motion.div
                              className={`relative p-4 rounded-xl bg-linear-to-br ${item.gradient}`}
                              whileHover={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: 1.1,
                              }}
                              transition={{ duration: 0.5 }}
                            >
                              <item.icon className="w-7 h-7 text-white relative z-10" />
                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-white/20 rounded-xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                            </motion.div>

                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                              <span className="text-5xl font-bold text-border group-hover:text-primary/30 transition-colors duration-300">
                                {step.step}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>

                          {/* Progress indicator */}
                          <div className="mt-6 pt-4 border-t border-border/50">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="flex-1 h-1 bg-border/50 rounded-full overflow-hidden">
                                <motion.div
                                  className={`h-full bg-linear-to-r ${item.gradient}`}
                                  initial={{ width: "0%" }}
                                  whileInView={{ width: "100%" }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 1,
                                    delay: index * 0.2,
                                  }}
                                />
                              </div>
                              <span className="font-medium">
                                Step {index + 1}/6
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Bottom shine effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Connection line to next card (desktop only) */}
                      {index < processSteps.length - 1 &&
                        (index + 1) % 3 !== 0 && (
                          <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px">
                            <motion.div
                              className="h-full bg-linear-to-r from-primary/50 to-transparent"
                              initial={{ scaleX: 0 }}
                              whileInView={{ scaleX: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.8,
                                delay: index * 0.15,
                              }}
                            />
                            <motion.div
                              className="absolute top-1/2 right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.15 + 0.8,
                              }}
                              animate={{ scale: [1, 1.5, 1] }}
                            />
                          </div>
                        )}
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={0.6}>
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            ></motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* GLOBAL REACH */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
                Global Reach
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our network spans across major crude oil producing regions and
                international markets, connecting West Africa, the Middle East,
                Europe, and Asia.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative max-w-4xl mx-auto h-64 md:h-80 rounded-lg border border-border bg-card overflow-hidden flex items-center justify-center">
              {/* Stylized world map representation */}
              <div className="relative w-full h-full p-8">
                <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-border" />
                {/* Trade route dots */}
                {[
                  { top: "30%", left: "25%", label: "West Africa" },
                  { top: "35%", left: "55%", label: "Middle East" },
                  { top: "25%", left: "48%", label: "Europe" },
                  { top: "30%", left: "75%", label: "Asia" },
                ].map((point) => (
                  <div
                    key={point.label}
                    className="absolute flex flex-col items-center"
                    style={{ top: point.top, left: point.left }}
                  >
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
                    <span className="mt-2 text-[10px] text-muted-foreground font-medium whitespace-nowrap">
                      {point.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-card border-t border-border">
        <div className="container mx-auto px-6">
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
