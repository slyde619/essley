import { MapPin, Mail, Phone, Clock } from "lucide-react";
import BackgroundAnimations from "@/components/contact/BackgroundAnimations";
import ContactHero from "@/components/contact/ContactHero";
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
      gradient: "from-primary/90 to-primary/70",
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@essleytrading.com"],
      gradient: "from-primary to-primary/80",
    },
    {
      icon: Phone,
      title: "Phone & WhatsApp",
      details: ["+1 XXX XXX XXXX", "Available Mon-Fri"],
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
    <main className="pt-20 md:pt-24 relative overflow-hidden">
      <BackgroundAnimations />

      {/* Content */}
      <div className="relative z-10">
        <ContactHero />

        {/* Contact Cards Grid */}
        <section className="pb-16 md:pb-20 lg:pb-28">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
              {contactDetails.map((contact, index) => (
                <ContactCard
                  key={contact.title}
                  contact={contact}
                  index={index}
                />
              ))}
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <RegionalPresence />
              <ResponseTime />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Contact;
