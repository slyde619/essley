import { MapPin, Mail, Phone, Clock, Globe, Zap, Shield } from "lucide-react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import GridBackground from "@/components/GridBackground";

const Contact = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [
        "501 Kirkland Ave Apt 102",
        "Kirkland, WA, 98033, United States",
      ],
      gradient: "from-primary/90 to-primary/70",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@essleytrading.com", "inquiry@essleytrading.com"],
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      details: ["+234 XXX XXX XXXX", "Available Mon-Fri"],
      gradient: "from-primary/80 to-primary/60",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 08:00 - 18:00 WAT", "Sat: By Appointment"],
      gradient: "from-primary/95 to-primary/75",
    },
  ];

  return (
    <main className="pt-24 relative overflow-hidden">
      {/* Multi-layered Grid Background */}
      <div className="fixed inset-0 z-0">
        <GridBackground
          gridSize={100}
          lineColor="rgba(234, 88, 12, 0.06)"
          backgroundColor="transparent"
          fade
          className="absolute inset-0"
        />
        {/* Secondary finer grid */}
        <div className="absolute inset-0 opacity-30">
          <GridBackground
            gridSize={50}
            lineColor="rgba(234, 88, 12, 0.03)"
            backgroundColor="transparent"
            className="absolute inset-0"
          />
        </div>

        {/* Radial gradients for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(234,88,12,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(234,88,12,0.05),transparent_50%)]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6">
            <ScrollReveal>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center"
              >
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1]"
                >
                  Get in Touch
                </motion.h1>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-24 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8"
                />

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
                >
                  Engage with our brokerage team to discuss crude oil
                  transaction opportunities. All inquiries are treated with
                  strict confidentiality.
                </motion.p>
              </motion.div>
            </ScrollReveal>
          </div>
        </section>

        {/* Contact Cards Grid */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactDetails.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.3 },
                      }}
                      className="group relative h-full"
                    >
                      {/* Glow effect */}
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${contact.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}
                      />

                      {/* Card */}
                      <div className="relative p-8 rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 h-full backdrop-blur-sm">
                        {/* Top gradient bar */}
                        <div
                          className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${contact.gradient} rounded-t-2xl`}
                        />

                        <div className="flex flex-col h-full">
                          <motion.div
                            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center mb-6 relative overflow-hidden`}
                            whileHover={{
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <IconComponent
                              size={24}
                              className="text-white relative z-10"
                            />
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000" />
                          </motion.div>

                          <h3 className="font-heading text-lg font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                            {contact.title}
                          </h3>

                          <div className="space-y-2 mt-auto">
                            {contact.details.map((detail, i) => (
                              <p
                                key={i}
                                className="text-sm text-muted-foreground leading-relaxed"
                              >
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Bottom shine effect */}
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </motion.div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Office Information */}
              <ScrollReveal delay={0.5}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  {/* Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/90 to-primary/70 rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                  <div className="relative p-10 rounded-2xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/90 to-primary/70 flex items-center justify-center">
                        <Globe size={24} className="text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        Regional Presence
                      </h3>
                    </div>

                    <div className="space-y-6">
                      {[
                        {
                          title: "United States",
                          desc: "Primary trading operations and brokerage services",
                        },
                        {
                          title: "International Network",
                          desc: "Strategic partnerships across Europe, Asia, Africa, and the Americas",
                        },
                        {
                          title: "Compliance",
                          desc: "All operations conducted under NCND and strict KYC protocols",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                          className="pb-6 border-b border-border last:border-b-0 last:pb-0"
                        >
                          <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item.title}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed pl-3.5">
                            {item.desc}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* Response Time */}
              <ScrollReveal delay={0.6}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="group relative"
                >
                  {/* Glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-2xl opacity-0 group-hover:opacity-15 blur-xl transition-all duration-500" />

                  <div className="relative p-10 rounded-2xl border border-border bg-card/80 backdrop-blur-sm h-full flex flex-col hover:border-primary/30 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <Clock size={24} className="text-white" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-foreground">
                        Response Time
                      </h3>
                    </div>

                    <div className="space-y-6 grow">
                      {[
                        {
                          title: "Buyer Mandates",
                          desc: "Reviewed and responded to within 48 business hours",
                        },
                        {
                          title: "General Inquiries",
                          desc: "Initial response within 24 business hours",
                        },
                        {
                          title: "Urgent Matters",
                          desc: "WhatsApp available for time-sensitive communications",
                        },
                      ].map((item, i) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                          className="flex items-start gap-4"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 animate-pulse" />
                          <div>
                            <p className="text-sm font-bold text-foreground mb-1">
                              {item.title}
                            </p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1 }}
                      className="mt-8 pt-6 border-t border-border"
                    >
                      <div className="flex items-start gap-2">
                        <Shield
                          size={14}
                          className="text-primary mt-0.5 shrink-0"
                        />
                        <p className="text-xs text-muted-foreground italic leading-relaxed">
                          All communications are subject to standard
                          confidentiality agreements and NCND protocols.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
