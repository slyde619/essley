import { MessageCircle } from "lucide-react";
import { useState } from "react";

const WhatsAppButton = () => {
  const [hovered, setHovered] = useState(false);

  const phoneNumber = "2348023376526";
  const message = encodeURIComponent(
    "Hello Essley Trading, I would like to discuss a crude oil transaction.",
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {hovered && (
        <div className="bg-card border border-border rounded-lg px-4 py-2 shadow-xl animate-fade-in">
          <p className="text-xs text-foreground whitespace-nowrap font-medium">
            Chat with Our Brokerage Team
          </p>
        </div>
      )}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 animate-pulse-glow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} className="text-primary-foreground" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
