import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { useInView } from "framer-motion";
import { Check, ArrowRight, Globe, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [modalState, setModalState] = useState({ isOpen: false, type: "mandate" });

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
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-background/40" />

        {/* Decorative vertical lines */}
        <div className="absolute inset-y-0 left-[10%] w-px bg-border/30" />
        <div className="absolute inset-y-0 left-[30%] w-px bg-border/20" />
        <div className="absolute inset-y-0 right-[30%] w-px bg-border/20" />
        <div className="absolute inset-y-0 right-[10%] w-px bg-border/30" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left: Text Content */}
            <ScrollReveal>
              <div>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                  EST. 2012
                </span>
                <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-[1.05]">
                  About Essley Trading
                </h1>
                <p className="text-2xl md:text-3xl italic text-muted-foreground font-heading leading-tight">
                  A trusted intermediary in global crude oil transactions
                </p>
              </div>
            </ScrollReveal>

            {/* Right: Stats Grid */}
            <ScrollReveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {heroStats.map((stat, i) => (
                  <div
                    key={i}
                    className="h-full p-6 border border-border bg-card/50 backdrop-blur-sm rounded-lg hover:border-primary/50 transition-all duration-300 flex flex-col"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground leading-snug">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* MARQUEE BAND */}
      <section className="py-6 bg-card border-y border-border overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-sm font-medium text-muted-foreground tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Background */}
            <ScrollReveal>
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                    {story.background.title}
                  </span>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {story.background.content}
                  </p>
                </div>
                <blockquote className="pl-6 border-l-2 border-primary">
                  <p className="text-xl italic text-foreground font-heading leading-relaxed">
                    {story.background.quote}
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>

            {/* Mission */}
            <ScrollReveal delay={0.2}>
              <div className="p-8 bg-card rounded-lg border border-border">
                <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-6">
                  {story.mission.title}
                </h3>
                <ul className="space-y-4">
                  {story.mission.points.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* NUMBERS SECTION */}
      <section className="py-28 bg-card relative overflow-hidden">
        {/* Radial glow background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                By the Numbers
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </div>
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
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Journey
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
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
                <div className="w-16 h-0.5 bg-primary" />
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
              <div className="w-16 h-0.5 bg-primary mx-auto" />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left: Regions List */}
            <ScrollReveal>
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Global Presence
                </h2>
                <div className="w-16 h-0.5 bg-primary mb-8" />
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Essley Trading operates across six continents, connecting
                  verified sellers with qualified buyers through a network built
                  on trust, compliance, and professionalism.
                </p>
                <ul className="space-y-4">
                  {globalRegions.map((region, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Globe className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-heading font-semibold text-foreground mb-1">
                          {region.region}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {region.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Right: Map Visualization */}
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 rounded-full border border-border/30" />
                <div className="absolute inset-8 rounded-full border border-border/20" />
                <div className="absolute inset-16 rounded-full border border-border/10" />

                {/* Animated points */}
                {[0, 60, 120, 180, 240, 300].map((angle, i) => {
                  const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);
                  return (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-primary animate-pulse"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        animationDelay: `${i * 0.3}s`,
                      }}
                    />
                  );
                })}

                {/* Center point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>
              </div>
            </ScrollReveal>
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
