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
  "Advanced LNG Processing & Distribution.",
  "Offshore Platforms. Onshore Excellence.",
  "World-Class Refinery Networks.",
  "Industrial-Scale Processing Systems.",
  "Structured Energy Transactions. Globally Connected.",
  "Coastal Terminals. Seamless Logistics.",
];

export const heroImages = [
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629153/avi/seedream-4.5_Ultra-detailed_liquefied_natural_gas_processing_facility_at_twilight_tall_silver-0_bfkw2f.avif",
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629151/avi/seedream-4.5_Ultra-realistic_offshore_oil_drilling_platform_standing_in_calm_ocean_water_mass-0_llvrdv.avif",
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629149/avi/seedream-4.5_Ultra-wide_cinematic_view_of_oil_refinery_skyline_with_tall_distillation_columns-0_vs9vua.avif",
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629150/avi/seedream-4.5_Ultra-realistic_refinery_interior_filled_with_complex_stainless_steel_pipeline_n-0_utczip.avif",
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629152/avi/seedream-4.5_Massive_oil_refinery_complex_at_dusk_transitioning_into_night_intricate_network_-0_bmvcz2.avif",
  "https://res.cloudinary.com/dhjmedwbx/image/upload/v1772629152/avi/seedream-4.5_Massive_oil_pipeline_terminal_near_coastline_during_nightfall_pipelines_stretchi-0_1_noznjf.avif",
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
