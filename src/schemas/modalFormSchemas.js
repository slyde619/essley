import { z } from "zod";

// Mandate Form Schema - Step by Step
export const mandateStep1Schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be less than 100 characters"),
  title: z
    .string()
    .trim()
    .min(2, "Title must be at least 2 characters")
    .max(100, "Title must be less than 100 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(200, "Company name must be less than 200 characters"),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid corporate email"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters"),
  registrationNumber: z
    .string()
    .trim()
    .min(3, "Registration number must be at least 3 characters")
    .max(50, "Registration number must be less than 50 characters"),
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
    .min(1, "Please select delivery terms"),
  destinationPort: z
    .string()
    .trim()
    .min(2, "Destination port must be at least 2 characters")
    .max(200, "Destination port must be less than 200 characters"),
  contractDuration: z
    .string()
    .min(1, "Please select contract duration"),
});

export const mandateStep3Schema = z.object({
  financialInstrument: z
    .string()
    .min(1, "Please select a financial instrument"),
  endUse: z
    .string()
    .min(1, "Please select end-use"),
  source: z
    .string()
    .min(1, "Please select how you heard about us"),
  notes: z
    .string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
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
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be less than 50 characters"),
  company: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters"),
  contactMethod: z
    .string()
    .min(1, "Please select a contact method"),
  topics: z
    .array(z.string())
    .min(1, "Please select at least one discussion topic")
    .max(6, "Maximum 6 topics can be selected"),
});

export const speakStep2Schema = z.object({
  timeSlot: z.string().min(1, "Please select a preferred time slot"),
  timezone: z
    .string()
    .min(1, "Please select your timezone"),
  urgency: z
    .string()
    .min(1, "Please select urgency level"),
  agenda: z
    .string()
    .trim()
    .max(1000, "Agenda must be less than 1000 characters")
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
