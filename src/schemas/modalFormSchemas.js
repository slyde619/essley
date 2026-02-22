import * as v from "valibot";

// ─── Mandate Form Schema - Step by Step ─────────────────────────────

export const mandateStep1Schema = v.object({
  fullName: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Full name must be at least 2 characters"),
    v.maxLength(100, "Full name must be less than 100 characters"),
  ),
  title: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Title must be at least 2 characters"),
    v.maxLength(100, "Title must be less than 100 characters"),
  ),
  company: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Company name must be at least 2 characters"),
    v.maxLength(200, "Company name must be less than 200 characters"),
  ),
  country: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Country must be at least 2 characters"),
    v.maxLength(100, "Country must be less than 100 characters"),
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("Please enter a valid email"),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(10, "Phone number must be at least 10 characters"),
    v.maxLength(12, "Phone number must be less than 12 characters"),
  ),
  registrationNumber: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Registration number must be at least 3 characters"),
    v.maxLength(50, "Registration number must be less than 50 characters"),
  ),
});

export const mandateStep2Schema = v.object({
  products: v.pipe(
    v.array(v.string()),
    v.minLength(1, "Please select at least one product"),
    v.maxLength(5, "Maximum 5 products can be selected"),
  ),
  volume: v.pipe(
    v.number(),
    v.minValue(500000, "Minimum volume is 500,000 BBL"),
    v.maxValue(5000000, "Maximum volume is 5,000,000 BBL"),
  ),
  deliveryTerms: v.pipe(v.string(), v.nonEmpty("Please select delivery terms")),
  destinationPort: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Destination port must be at least 2 characters"),
    v.maxLength(200, "Destination port must be less than 200 characters"),
  ),
  contractDuration: v.pipe(
    v.string(),
    v.nonEmpty("Please select contract duration"),
  ),
});

export const mandateStep3Schema = v.object({
  financialInstrument: v.pipe(
    v.string(),
    v.nonEmpty("Please select a financial instrument"),
  ),
  endUse: v.pipe(v.string(), v.nonEmpty("Please select end-use")),
  source: v.pipe(
    v.string(),
    v.nonEmpty("Please select how you heard about us"),
  ),
  notes: v.union([
    v.literal(""),
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(1000, "Notes must be less than 1000 characters"),
    ),
  ]),
});

// Complete Mandate Schema (all steps merged)
export const completeMandateSchema = v.object({
  ...mandateStep1Schema.entries,
  ...mandateStep2Schema.entries,
  ...mandateStep3Schema.entries,
});

// ─── Speak Form Schema - Step by Step ────────────────────────────────

export const speakStep1Schema = v.object({
  fullName: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Full name must be at least 2 characters"),
    v.maxLength(50, "Full name must be less than 50 characters"),
  ),
  company: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(2, "Company name must be at least 2 characters"),
    v.maxLength(50, "Company name must be less than 50 characters"),
  ),
  email: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty("Email is required"),
    v.email("Please enter a valid email"),
  ),
  phone: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(10, "Phone number must be at least 10 characters"),
    v.maxLength(20, "Phone number must be less than 20 characters"),
  ),
  contactMethod: v.pipe(
    v.string(),
    v.nonEmpty("Please select a contact method"),
  ),
  topics: v.pipe(
    v.array(v.string()),
    v.minLength(1, "Please select at least one discussion topic"),
    v.maxLength(6, "Maximum 6 topics can be selected"),
  ),
});

export const speakStep2Schema = v.object({
  timeSlot: v.pipe(
    v.string(),
    v.nonEmpty("Please select a preferred time slot"),
  ),
  timezone: v.pipe(v.string(), v.nonEmpty("Please select your timezone")),
  urgency: v.pipe(v.string(), v.nonEmpty("Please select urgency level")),
  agenda: v.union([
    v.literal(""),
    v.pipe(
      v.string(),
      v.trim(),
      v.maxLength(1000, "Agenda must be less than 1000 characters"),
    ),
  ]),
});

// Complete Speak Schema
export const completeSpeakSchema = v.object({
  ...speakStep1Schema.entries,
  ...speakStep2Schema.entries,
});

// ─── Schema selector helper ──────────────────────────────────────────

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
  return v.object({});
};
