import { MapPin, Mail, Phone, Clock } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ContactCard from "@/components/contact/ContactCard";
import RegionalPresence from "@/components/contact/RegionalPresence";
import ResponseTime from "@/components/contact/ResponseTime";

const Contact = () => {
  const contactDetails = [
    {
      icon: MapPin,
      title: "Head Office",
      details: [
        "501 Kirkland Ave Apt 102",
        "Kirkland, WA, 98033, United States",
      ],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@essleytrading.com"],
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      details: ["+1 564 212 5986", "Available Mon-Fri"],
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 08:00 - 18:00 WAT", "Sat: By Appointment"],
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Contact Us
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Get in Touch
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Engage with our brokerage team to discuss crude oil transaction
                opportunities. All inquiries are treated with strict
                confidentiality.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Cards Grid with Background */}
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
          <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/50 to-background/70" />
        </div>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='contactBgGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='50' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23contactBgGrain)' opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundSize: "256px 256px",
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                Contact Information
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Multiple channels to reach our team for your crude oil trading
                inquiries
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-7xl mx-auto">
            {contactDetails.map((contact, index) => (
              <ContactCard
                key={contact.title}
                contact={contact}
                index={index}
              />
            ))}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            <RegionalPresence />
            <ResponseTime />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
