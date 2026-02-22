import {
  Shield,
  FileCheck,
  Users,
  Eye,
  Lock,
  Scale,
  Landmark,
} from "lucide-react";

export const headlines = [
  "Structured Energy Transactions. Globally Connected.",
  "Verified Sellers. Qualified Buyers. Secure Execution.",
  "Precision Brokerage in Global Oil Markets.",
];

export const heroImages = [
  "/images/hero.webp", // Oil tanker at sea
  "/images/hero2.webp", // Refinery operations
  "/images/hero3.webp", // Business handshake
];

export const roleItems = [
  {
    icon: FileCheck,
    title: "Seller Mandate Representation",
    description:
      "We represent verified sellers with authenticated mandates, ensuring legitimacy at every stage of the transaction pipeline.",
  },
  {
    icon: Users,
    title: "Buyer Verification & Matching",
    description:
      "Rigorous due diligence on all prospective buyers including financial capability assessment and end-user verification.",
  },
  {
    icon: Shield,
    title: "Document Facilitation",
    description:
      "End-to-end coordination of SCO, ICPO, SPA, and all contractual instruments required for structured transactions.",
  },
];

export const products = [
  { name: "Virgin Fuel Oil D6", origin: "Multi-origin", api: "Industrial Grade" },
  { name: "EN-590 Diesel (ULSD)", origin: "European Standard", api: "Diesel Grade" },
  { name: "LNG (Liquefied Natural Gas)", origin: "Multi-origin", api: "Cryogenic Grade" },
  { name: "Jet Fuel (Jet A1)", origin: "Multi-origin", api: "Aviation Grade" },
  { name: "WTI – West Texas Intermediate", origin: "United States", api: "39.6° API" },
];

export const processSteps = [
  {
    step: "01",
    title: "Buyer Submission",
    description:
      "Qualified buyer submits LOI with proof of funds and corporate documentation.",
  },
  {
    step: "02",
    title: "Verification",
    description:
      "KYC/AML compliance checks and financial instrument validation.",
  },
  {
    step: "03",
    title: "SCO Issuance",
    description:
      "Soft Corporate Offer issued to buyer with product specifications and pricing.",
  },
  {
    step: "04",
    title: "ICPO Review",
    description:
      "Irrevocable Corporate Purchase Order reviewed and accepted by seller.",
  },
  {
    step: "05",
    title: "Contract Signing",
    description:
      "Sale and Purchase Agreement executed between principal parties.",
  },
  {
    step: "06",
    title: "Lifting & Delivery",
    description:
      "Product inspection, lifting coordination, and vessel nomination.",
  },
];

export const complianceItems = [
  { icon: Eye, label: "KYC Verification" },
  { icon: Shield, label: "AML Screening" },
  { icon: Lock, label: "NDA Enforcement" },
  { icon: Scale, label: "Anti-Circumvention" },
  { icon: Landmark, label: "Financial Validation" },
];
