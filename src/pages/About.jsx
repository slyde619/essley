import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useInView } from "framer-motion";
import {
  Check,
  ArrowRight,
  Globe,
  ChevronLeft,
  ChevronRight,
  Anchor,
  Ship,
  Building2,
  Fuel,
  TrendingUp,
  Network,
} from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import Modal from "@/components/Modal";
import {
  heroStats,
  marqueeItems,
  story,
  numbers,
  timeline,
  coreValues,
  principles,
  leadership,
  globalRegions,
} from "@/data/about";

// Counter component with animation
const Counter = ({ value, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-heading font-bold">
      {prefix}
      {typeof value === "number" && value % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
};

const About = () => {
  const principlesRef = useRef(null);
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "mandate",
  });

  const openModal = (type) => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "mandate" });
  };

  const scrollPrinciples = (direction) => {
    if (principlesRef.current) {
      const scrollAmount = 350; // Card width + gap
      const currentScroll = principlesRef.current.scrollLeft;
      const targetScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      principlesRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="pt-24">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629149/avi/seedream-4.5_Ultra-detailed_cinematic_view_of_refinery_flare_stack_tower_controlled_natural_g-0_urgboe.avif"
            alt="Refinery Background"
            className="w-full h-full object-fill"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/30 to-background/50" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='heroGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23heroGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Text Content */}
            <ScrollReveal>
              <div className="text-center">
                <span className="text-xs font-medium tracking-widest uppercase text-primary/80 mb-4 block">
                  EST. 2012
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                  About Essley Trading
                </h1>
              </div>
            </ScrollReveal>

            {/* Stats - Simplified inline */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-4 mt-12">
                {heroStats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-2 text-center md:text-left"
                  >
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {stat.value}
                    </span>
                    <span className="text-xs md:text-sm text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="py-6 bg-card border-y border-border overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map(
            (item, i) => (
              <div key={i} className="flex items-center gap-8 flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-sm font-medium text-muted-foreground tracking-wide">
                  {item}
                </span>
              </div>
            ),
          )}
        </div>
      </section>

      {/* OUR BACKGROUND SECTION - REDESIGNED */}
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <div className="mb-10">
              <span className="text-xs font-medium text-primary uppercase tracking-widest">
                {story.background.title}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative group">
              {/* Main Card */}
              <div className="relative bg-card border border-border rounded-md p-10 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                {/* Sand/Grain Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-[0.15] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='sandGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='5' seed='12' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.2'/%3E%3CfeFuncG type='linear' slope='1.1'/%3E%3CfeFuncB type='linear' slope='0.9'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23sandGrain)' opacity='0.6'/%3E%3C/svg%3E")`,
                    backgroundSize: "200px 200px",
                  }}
                />

                {/* Content */}
                <div className="relative space-y-6">
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed">
                    {story.background.content}
                  </p>

                  <div className="h-px bg-border my-8" />

                  <div className="pl-6 border-l-2 border-primary/30">
                    <p className="text-xl md:text-2xl text-foreground italic leading-relaxed">
                      {story.background.quote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* NUMBERS SECTION */}
      <section className="py-28 bg-card relative overflow-hidden">
        {/* Radial glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {numbers.map((num, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="h-full p-8 border border-border bg-background/50 rounded-lg hover:border-primary/50 hover:bg-background transition-all duration-300 flex flex-col">
                  <div className="text-4xl md:text-5xl text-primary mb-3">
                    <Counter
                      value={num.value}
                      prefix={num.prefix}
                      suffix={num.suffix}
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {num.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {num.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-28 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629151/avi/seedream-4.5_Ultra-realistic_cinematic_oil_and_gas_pipeline_infrastructure_multiple_large_ind-0_ydpvzf.avif"
            alt="Pipeline Infrastructure"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-background/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/65 to-background/75" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='timelineGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='7' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23timelineGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto space-y-12">
            {timeline.map((event, i) => (
              <ScrollReveal key={event.year} delay={i * 0.1}>
                <div className="flex gap-8">
                  {/* Year + Dot */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-20 text-right pr-6">
                      <span className="text-2xl font-heading font-bold text-primary ">
                        {event.year}
                      </span>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-background my-4" />
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-border" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-12 flex-1">
                    <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 rounded-md bg-card text-muted-foreground border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION/VALUES SPLIT SECTION */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-7xl mx-auto rounded-lg overflow-hidden border border-border">
            {/* Left: Mission Panel (Orange) */}
            <ScrollReveal>
              <div className="p-12 lg:p-16 bg-primary text-primary-foreground flex flex-col justify-center">
                <span className="text-xs font-medium tracking-[0.2em] uppercase mb-6 opacity-90">
                  Our Mission
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold leading-tight">
                  To serve as the definitive bridge between verified energy
                  suppliers and qualified global buyers
                </h2>
              </div>
            </ScrollReveal>

            {/* Right: Values Panel (Dark) */}
            <ScrollReveal delay={0.2}>
              <div className="p-12 lg:p-16 bg-card">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-8">
                  Core Values
                </h3>
                <ul className="space-y-6">
                  {coreValues.map((value) => (
                    <li
                      key={value.number}
                      className="flex gap-4 group cursor-default"
                    >
                      <span className="text-2xl font-heading font-bold text-primary/30 ">
                        {value.number}
                      </span>
                      <div>
                        <h4 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {value.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRINCIPLES SECTION */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="mb-16 flex items-center justify-between">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Operating Principles
                </h2>
              </div>

              {/* Navigation Controls */}
              <div className="hidden md:flex gap-2">
                <button
                  onClick={() => scrollPrinciples("left")}
                  className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-background transition-all duration-300"
                  aria-label="Previous principle"
                >
                  <ChevronLeft className="w-5 h-5 text-foreground" />
                </button>
                <button
                  onClick={() => scrollPrinciples("right")}
                  className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-background transition-all duration-300"
                  aria-label="Next principle"
                >
                  <ChevronRight className="w-5 h-5 text-foreground" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Horizontal Scroll Container */}
          <div
            ref={principlesRef}
            className="overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
          >
            <div className="flex gap-6 w-max">
              {principles.map((principle, i) => (
                <ScrollReveal key={principle.number} delay={i * 0.1}>
                  <div className="w-80 h-full min-h-[200px] p-8 bg-background border border-border rounded-lg hover:border-primary/50 transition-all duration-300 relative flex flex-col">
                    {/* Large number watermark */}
                    <div className="absolute top-4 right-4 text-6xl font-heading font-bold text-border/30">
                      {principle.number}
                    </div>
                    <div className="relative z-10 flex flex-col h-full">
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            <button
              onClick={() => scrollPrinciples("left")}
              className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-background transition-all duration-300"
              aria-label="Previous principle"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
            <button
              onClick={() => scrollPrinciples("right")}
              className="p-3 border border-border rounded-lg hover:border-primary/50 hover:bg-background transition-all duration-300"
              aria-label="Next principle"
            >
              <ChevronRight className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </section>

      {/* LEADERSHIP SECTION */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Leadership Team
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {leadership.map((leader, i) => (
              <ScrollReveal key={leader.initials} delay={i * 0.1}>
                <div className="h-full p-8 border border-border bg-card rounded-lg hover:border-primary/50 transition-all duration-300 group flex flex-col">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <span className="text-2xl font-heading font-bold text-primary">
                      {leader.initials}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-sm text-primary mb-4">{leader.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {leader.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {leader.expertise.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs px-3 py-1.5 rounded-md bg-background text-muted-foreground border border-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE SECTION */}
      <section className="py-28 bg-card">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Global Presence
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Essley Trading operates across six continents, connecting
                verified sellers with qualified buyers through a network built
                on trust, compliance, and professionalism.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {globalRegions.map((region, i) => {
              // Map regions to specific icons
              const iconMap = {
                "West Africa": Anchor,
                "Asia Pacific": Ship,
                "Europe": Building2,
                "Middle East": Fuel,
                "North America": TrendingUp,
                "South America": Network,
              };
              const IconComponent = iconMap[region.region] || Globe;

              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="relative h-full p-8 border border-border bg-background rounded-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
                    {/* Sand/Grain Texture Overlay */}
                    <div
                      className="absolute inset-0 opacity-[0.12] pointer-events-none"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='globalGrain${i}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='5' seed='${12 + i}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3CfeComponentTransfer%3E%3CfeFuncR type='linear' slope='1.2'/%3E%3CfeFuncG type='linear' slope='1.1'/%3E%3CfeFuncB type='linear' slope='0.9'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23globalGrain${i})' opacity='0.6'/%3E%3C/svg%3E")`,
                        backgroundSize: "200px 200px",
                      }}
                    />

                    <div className="relative">
                      <IconComponent className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                        {region.region}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {region.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="relative py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-background/60" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">
                Ready to Explore a Partnership?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Whether you're a verified seller or a qualified buyer, we invite
                you to learn more about how Essley Trading can facilitate your
                next transaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => openModal("speak")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  Get in Touch
                  <ArrowRight size={16} />
                </button>
                <Link
                  to="/process"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-border text-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:border-primary/50 hover:text-primary bg-background/50 backdrop-blur-sm"
                >
                  View Our Process
                </Link>
              </div>
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

export default About;
