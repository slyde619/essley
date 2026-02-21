import productImg1 from "../assets/products/virgin.webp";
import productImg2 from "../assets/products/en.webp";
import productImg3 from "../assets/products/lng.webp";
import productImg4 from "../assets/products/jet.webp";
import productImg5 from "../assets/products/wti.webp";

// Comprehensive product data with all details
export const productList = [
  {
    name: "Virgin Fuel Oil D6",
    title: "Virgin Fuel Oil D6",
    origin: "Multi-origin",
    api: "Industrial Grade",
    sulfur: "Variable",
    delivery: "FOB / CIF",
    description:
      "High-quality residual fuel oil for power generation and industrial applications. Industrial-grade fuel oil used for power generation, marine bunkering, and industrial heating applications.",
    image: productImg1,
    specs: [
      "Power generation grade",
      "Marine bunkering suitable",
      "Viscosity range specified",
      "Bulk volume availability",
    ],
  },
  {
    name: "EN-590 Diesel (Ultra Low Sulfur Diesel)",
    title: "EN-590 Diesel (Ultra Low Sulfur Diesel)",
    origin: "European Standard",
    api: "Diesel Grade",
    sulfur: "< 10 ppm (ULSD)",
    delivery: "FOB / CIF / Ex-Tank",
    description:
      "Ultra-low sulfur diesel meeting European EN590 specifications at 10ppm. Suitable for automotive and industrial applications with strict emissions compliance requirements.",
    image: productImg2,
    specs: [
      "Ultra-low sulfur diesel",
      "Euro V/VI compliant",
      "Cetane number > 51",
      "Cold flow properties specified",
    ],
  },
  {
    name: "LNG (Liquefied Natural Gas)",
    title: "LNG (Liquefied Natural Gas)",
    origin: "Multi-origin",
    api: "Cryogenic Grade",
    sulfur: "< 4 mg/m³",
    delivery: "FOB / CIF / DES",
    description:
      "Natural gas cooled to liquid state for efficient storage and transport. Clean-burning fuel for power generation and industrial use.",
    image: productImg3,
    specs: [
      "Cryogenic storage at -162°C",
      "High energy density",
      "Low emissions profile",
      "Regasification infrastructure",
    ],
  },
  {
    name: "Jet Fuel (Jet A1)",
    title: "Jet Fuel (Jet A1)",
    origin: "Multi-origin",
    api: "Aviation Grade",
    sulfur: "< 0.3%",
    delivery: "FOB / CIF / Ex-Tank",
    description:
      "Aviation turbine fuel meeting international Jet A1 specifications. Sourced from certified refineries with full quality documentation and chain-of-custody verification.",
    image: productImg4,
    specs: [
      "IATA/Joint Inspection Group certified",
      "Flash point > 38°C",
      "Freezing point < -47°C",
      "Full quality documentation",
    ],
  },
  {
    name: "WTI – West Texas Intermediate",
    title: "WTI – West Texas Intermediate",
    origin: "United States",
    api: "39.6° API",
    sulfur: "0.24% (Sweet)",
    delivery: "FOB / CIF",
    description:
      "Light, sweet crude oil serving as a pricing benchmark for North American markets. Premium quality crude oil with excellent refining characteristics.",
    image: productImg5,
    specs: [
      "Light, sweet crude",
      "North American benchmark",
      "High gasoline & diesel yield",
      "Low refining costs",
    ],
  },
];

// Simple product data for cards (derived from productList)
export const products = productList.map(({ title, description, image }) => ({
  title,
  description: description.split('.')[0] + '.',
  image,
}));
