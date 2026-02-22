import { z } from "zod";

// Common validation patterns
const phoneRegex = /^\+?[1-9]\d{1,14}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mandate Form Schema - Step by Step
export const mandateStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 100 characters")
    .trim(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(20, "Title must be less than 100 characters")
    .trim(),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 200 characters")
    .trim(),
  country: z
    .string()
    .min(2, "Country must be at least 2 characters")
    .max(30, "Country must be less than 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid corporate email")
    .refine((email) => emailRegex.test(email), {
      message: "Please enter a valid email address",
    })
    .transform((email) => email.toLowerCase().trim()),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 20 characters")
    .refine((phone) => phoneRegex.test(phone.replace(/[\s()-]/g, "")), {
      message: "Please enter a valid phone number (e.g., +1234567890)",
    }),
  registrationNumber: z
    .string()
    .min(3, "Registration number must be at least 3 characters")
    .max(50, "Registration number must be less than 50 characters")
    .trim(),
});

export const mandateStep2Schema = z.object({
  products: z
    .array(z.string())
    .min(1, "Please select at least one product")
    .max(5, "Maximum 5 products can be selected"),
  volume: z
    .number()
    .min(500000, "Minimum volume is 500,000 BBL")
    .max(5000000, "Maximum volume is 5,000,000 BBL"),
  deliveryTerms: z
    .string()
    .min(1, "Please select delivery terms")
    .refine((val) => ["fob", "cif", "either"].includes(val), {
      message: "Invalid delivery terms selected",
    }),
  destinationPort: z
    .string()
    .min(2, "Destination port must be at least 2 characters")
    .max(200, "Destination port must be less than 200 characters")
    .trim(),
  contractDuration: z
    .string()
    .min(1, "Please select contract duration")
    .refine((val) => ["spot", "3m", "6m", "12m", "24m"].includes(val), {
      message: "Invalid contract duration selected",
    }),
});

export const mandateStep3Schema = z.object({
  financialInstrument: z
    .string()
    .min(1, "Please select a financial instrument")
    .refine(
      (val) => ["lc", "sblc", "bcl", "pof", "tt", "undisclosed"].includes(val),
      {
        message: "Invalid financial instrument selected",
      },
    ),
  endUse: z
    .string()
    .min(1, "Please select end-use")
    .refine(
      (val) =>
        [
          "refinery",
          "power",
          "aviation",
          "industrial",
          "marine",
          "distribution",
          "government",
        ].includes(val),
      {
        message: "Invalid end-use selected",
      },
    ),
  source: z
    .string()
    .min(1, "Please select how you heard about us")
    .refine(
      (val) =>
        ["referral", "search", "event", "linkedin", "other"].includes(val),
      {
        message: "Invalid source selected",
      },
    ),
  notes: z
    .string()
    .max(1000, "Notes must be less than 1000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
});

// Complete Mandate Schema
export const completeMandateSchema = mandateStep1Schema
  .extend(mandateStep2Schema.shape)
  .extend(mandateStep3Schema.shape);

// Speak Form Schema - Step by Step
export const speakStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters")
    .trim(),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 50 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email")
    .refine((email) => emailRegex.test(email), {
      message: "Please enter a valid email address",
    })
    .transform((email) => email.toLowerCase().trim()),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 characters")
    .refine((phone) => phoneRegex.test(phone.replace(/[\s()-]/g, "")), {
      message: "Please enter a valid phone number (e.g., +1234567890)",
    }),
  contactMethod: z
    .string()
    .refine((val) => ["phone", "whatsapp"].includes(val), {
      message: "Invalid contact method selected",
    }),
  topics: z
    .array(z.string())
    .min(1, "Please select at least one discussion topic")
    .max(6, "Maximum 6 topics can be selected"),
});

export const speakStep2Schema = z.object({
  timeSlot: z.string().min(1, "Please select a preferred time slot"),
  timezone: z
    .string()
    .min(1, "Please select your timezone")
    .refine(
      (val) =>
        [
          "est",
          "pst",
          "gmt",
          "wat",
          "cat",
          "eat",
          "gst",
          "ist",
          "cst",
          "jst",
        ].includes(val),
      {
        message: "Invalid timezone selected",
      },
    ),
  urgency: z
    .string()
    .min(1, "Please select urgency level")
    .refine(
      (val) => ["urgent", "high", "standard", "exploratory"].includes(val),
      {
        message: "Invalid urgency level selected",
      },
    ),
  agenda: z
    .string()
    .max(1000, "Agenda must be less than 1000 characters")
    .trim()
    .optional()
    .or(z.literal("")),
});

// Complete Speak Schema

export const completeSpeakSchema = speakStep1Schema.extend(
  speakStep2Schema.shape,
);

// Schema selector helper
export const getSchemaForStep = (type, step) => {
  if (type === "mandate") {
    switch (step) {
      case 1:
        return mandateStep1Schema;
      case 2:
        return mandateStep2Schema;
      case 3:
        return mandateStep3Schema;
      default:
        return mandateStep1Schema;
    }
  } else if (type === "speak") {
    switch (step) {
      case 1:
        return speakStep1Schema;
      case 2:
        return speakStep2Schema;
      default:
        return speakStep1Schema;
    }
  }
  return z.object({});
};
