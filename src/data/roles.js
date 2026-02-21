import {
  FileCheck,
  Users,
  ClipboardList,
  Handshake,
  Search,
  Ship,
} from "lucide-react";

export const roles = [
  {
    icon: FileCheck,
    title: "Seller Mandate Verification",
    description:
      "We authenticate and verify all seller mandates to ensure legitimacy, proper authorization from principals, and compliance with applicable regulations before initiating any transaction process.",
  },
  {
    icon: Users,
    title: "Buyer Qualification",
    description:
      "Prospective buyers undergo rigorous due diligence including financial capability assessment, corporate verification, end-user confirmation, and compliance screening against international sanctions lists.",
  },
  {
    icon: ClipboardList,
    title: "SCO & ICPO Coordination",
    description:
      "We facilitate the exchange of Soft Corporate Offers and Irrevocable Corporate Purchase Orders between verified parties, ensuring all terms align with international trade standards.",
  },
  {
    icon: Handshake,
    title: "SPA Facilitation",
    description:
      "Our team coordinates the drafting and execution of Sale and Purchase Agreements, working with legal counsel to protect the interests of all parties involved.",
  },
  {
    icon: Search,
    title: "Inspection & Quality Assurance",
    description:
      "We coordinate independent inspection services at loading and discharge ports, ensuring product quality meets contractual specifications.",
  },
  {
    icon: Ship,
    title: "Lifting & Delivery Coordination",
    description:
      "From vessel nomination to bill of lading, we manage the logistics chain to ensure smooth product lifting and timely delivery.",
  },
];
