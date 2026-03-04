import { useEffect, useRef, useReducer, useCallback } from "react";
import { useForm } from "react-hook-form";
import * as v from "valibot";
import { X } from "lucide-react";
import {
  getSchemaForStep,
  completeMandateSchema,
  completeSpeakSchema,
} from "@/schemas/modalFormSchemas";
import { useFormPersistence } from "@/hooks/useFormPersistence";
import ModalSidebar from "./modal/ModalSidebar";
import StepIndicator from "./modal/StepIndicator";
import SuccessState from "./modal/SuccessState";
import MandateStep1 from "./modal/MandateStep1";
import MandateStep2 from "./modal/MandateStep2";
import MandateStep3 from "./modal/MandateStep3";
import SpeakStep1 from "./modal/SpeakStep1";
import SpeakStep2 from "./modal/SpeakStep2";

// ── Web3Forms Config ─────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "c9ba9ee7-d947-4c11-8548-8679043e4b14";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const initialFormData = {
  fullName: "",
  title: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  registrationNumber: "",
  products: [],
  volume: 1000000,
  deliveryTerms: "",
  destinationPort: "",
  contractDuration: "",
  financialInstrument: "",
  endUse: "",
  source: "",
  notes: "",
  // Speak fields
  contactMethod: "phone",
  topics: [],
  timeSlot: "",
  timezone: "",
  urgency: "",
  agenda: "",
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "SET_STEP":
      return { ...state, currentStep: action.payload };
    case "SET_SUCCESS":
      return { ...state, showSuccess: action.payload };
    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };
    case "UPDATE_FORM_DATA":
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case "SET_SUBMIT_ERROR":
      return { ...state, submitError: action.payload };
    case "RESET":
      return {
        currentStep: 1,
        showSuccess: false,
        submitError: null,
        formData: initialFormData,
      };
    case "NEXT_STEP":
      return { ...state, currentStep: state.currentStep + 1 };
    case "PREV_STEP":
      return { ...state, currentStep: state.currentStep - 1 };
    default:
      return state;
  }
};

// ── Build Web3Forms FormData ─────────────────────────────────────
const buildFormData = (type, data) => {
  const formData = new FormData();

  // Core Web3Forms fields
  formData.append("access_key", WEB3FORMS_ACCESS_KEY);
  formData.append("redirect", "false");
  formData.append("botcheck", "");
  formData.append("from_name", data.fullName);
  formData.append("name", data.fullName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("company", data.company);
  formData.append(
    "timestamp",
    new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "short",
    }),
  );

  if (type === "mandate") {
    formData.append(
      "subject",
      `Buyer Mandate — ${data.company} (${data.fullName})`,
    );
    formData.append("designation", data.title);
    formData.append("country", data.country);
    formData.append("registration_number", data.registrationNumber);
    formData.append("products", (data.products || []).join(", "));
    formData.append("volume_bbl", Number(data.volume).toLocaleString());
    formData.append("delivery_terms", data.deliveryTerms);
    formData.append("destination_port", data.destinationPort);
    formData.append("contract_duration", data.contractDuration);
    formData.append("financial_instrument", data.financialInstrument);
    formData.append("end_use", data.endUse);
    formData.append("source", data.source);
    formData.append("notes", data.notes || "None provided");
  } else {
    formData.append(
      "subject",
      `Consultation Request — ${data.company} (${data.fullName})`,
    );
    formData.append("contact_method", data.contactMethod);
    formData.append("topics", (data.topics || []).join(", "));
    formData.append("preferred_time", data.timeSlot);
    formData.append("timezone", data.timezone);
    formData.append("urgency", data.urgency);
    formData.append("agenda", data.agenda || "None provided");
  }

  return formData;
};

const Modal = ({ isOpen, onClose, type = "mandate" }) => {
  const dialogRef = useRef(null);
  const [state, dispatch] = useReducer(modalReducer, {
    currentStep: 1,
    showSuccess: false,
    submitError: null,
    formData: initialFormData,
  });

  const { currentStep, showSuccess, submitError, formData } = state;

  // Accumulates validated field values across steps so unmounted step data isn't lost
  const validatedStepsRef = useRef({});

  const totalSteps = type === "mandate" ? 3 : 2;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  // react-hook-form
  const {
    register,
    formState: { errors, isSubmitting },
    setValue,
    setError,
    watch,
    reset,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: formData,
  });

  // Watch specific fields for UI reactivity
  const watchedProducts = watch("products");
  const watchedVolume = watch("volume");
  const watchedContactMethod = watch("contactMethod");
  const watchedTopics = watch("topics");
  const watchedTimeSlot = watch("timeSlot");

  // Keep reducer formData in sync with react-hook-form via watch subscription
  useEffect(() => {
    const subscription = watch((value) => {
      dispatch({ type: "UPDATE_FORM_DATA", payload: value });
    });
    return () => subscription.unsubscribe();
  }, []);

  // Keep a ref to latest formData so the persistence callback always has fresh data
  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Form persistence (localStorage save/restore)
  const restoreFormData = useCallback(
    (updaterOrData) => {
      const newData =
        typeof updaterOrData === "function"
          ? updaterOrData(formDataRef.current)
          : updaterOrData;

      dispatch({ type: "SET_FORM_DATA", payload: newData });
      Object.keys(newData).forEach((k) => {
        setValue(k, newData[k]);
      });
    },
    [setValue],
  );

  const { clearPersistedData, saveImmediately } = useFormPersistence(
    `modal-form-${type}`,
    formData,
    restoreFormData,
    isOpen,
    500,
  );

  // Open / close dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.close();
      document.body.style.overflow = "";
      setTimeout(() => {
        dispatch({ type: "RESET" });
        reset(initialFormData);
        validatedStepsRef.current = {};
        clearPersistedData();
      }, 300);
    }
  }, [isOpen, reset, clearPersistedData]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  const handleKeyPress = (callback) => (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  const toggleArrayItem = (field, value) => {
    const currentValue = watch(field) || [];
    const newValue = currentValue.includes(value)
      ? currentValue.filter((item) => item !== value)
      : [...currentValue, value];
    setValue(field, newValue, { shouldDirty: true });
  };

  // ──────────────────────────────────────────────────────────────────
  // Collect live values from the DOM + react-hook-form for non-input
  // fields (arrays, numbers set via setValue). This is the single
  // source of truth at validation time
  // ──────────────────────────────────────────────────────────────────
  const collectLiveValues = () => {
    const values = { ...formData };

    const form = dialogRef.current?.querySelector(".modal-content");
    if (form) {
      const inputs = form.querySelectorAll("input, select, textarea");
      inputs.forEach((el) => {
        const name = el.getAttribute("name");
        if (!name) return;

        if (el.type === "range") {
          values[name] = Number(el.value);
        } else {
          values[name] = el.value;
        }
      });
    }

    return values;
  };

  // ──────────────────────────────────────────────────────────────────
  // VALIDATION
  // ──────────────────────────────────────────────────────────────────
  const validateCurrentStep = () => {
    const schema = getSchemaForStep(type, currentStep);
    const liveValues = collectLiveValues();

    const stepKeys = Object.keys(schema.entries);
    const stepValues = {};
    stepKeys.forEach((key) => {
      stepValues[key] = liveValues[key];
    });

    clearErrors(stepKeys);

    const result = v.safeParse(schema, stepValues);

    if (!result.success) {
      result.issues.forEach((issue) => {
        const fieldName = issue.path?.map((p) => p.key).join(".") || "";
        if (fieldName) {
          setError(fieldName, { type: "manual", message: issue.message });
        }
      });
      return false;
    }

    dispatch({ type: "UPDATE_FORM_DATA", payload: stepValues });

    // Persist validated values so they survive when this step unmounts
    validatedStepsRef.current = { ...validatedStepsRef.current, ...stepValues };

    return true;
  };

  // ── Step navigation ────────────────────────────────────────────────

  const handleNext = () => {
    if (!validateCurrentStep()) {
      setTimeout(() => {
        const el = document.querySelector(".error");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          el.focus();
        }
      }, 50);
      return;
    }

    if (currentStep < totalSteps) {
      dispatch({ type: "NEXT_STEP" });
      saveImmediately();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      clearErrors();
      dispatch({ type: "PREV_STEP" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ── Submit ────────────────────────────────

  const handleSubmit = async () => {
    // Validate the last step first
    if (!validateCurrentStep()) return;

    // Full-form safety net using accumulated validated step data
    const completeSchema =
      type === "mandate" ? completeMandateSchema : completeSpeakSchema;
    const allValidatedData = { ...validatedStepsRef.current };
    const result = v.safeParse(completeSchema, allValidatedData);

    if (!result.success) {
      console.error("Full validation failed:", result.issues);
      result.issues.forEach((issue) => {
        const fieldName = issue.path?.map((p) => p.key).join(".") || "";
        if (fieldName) {
          setError(fieldName, { type: "manual", message: issue.message });
        }
      });
      return;
    }

    // Clear any previous submission error
    dispatch({ type: "SET_SUBMIT_ERROR", payload: null });

    try {
      const formPayload = buildFormData(type, result.output);

      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formPayload,
      });

      const responseData = await response.json();

      if (responseData.success) {
        dispatch({ type: "SET_SUCCESS", payload: true });
        validatedStepsRef.current = {};
        clearPersistedData();
      } else {
        console.error("Web3Forms submission error:", responseData);
        dispatch({
          type: "SET_SUBMIT_ERROR",
          payload:
            responseData.message || "Submission failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      dispatch({
        type: "SET_SUBMIT_ERROR",
        payload:
          "A network error occurred. Please check your connection and try again.",
      });
    }
  };

  // ── Render ─────────────────────────────────────────────────────────

  const stepLabels = {
    mandate: ["Company Information", "Product & Volume", "Transaction Details"],
    speak: ["Your Details", "Scheduling"],
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal-dialog"
      onClick={handleBackdropClick}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="modal-panel"
        role="document"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="modal-progress">
          <div
            className="modal-progress-bar"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="modal-inner">
          <ModalSidebar type={type} />

          <div className="modal-content">
            <header className="modal-header">
              <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepLabel={stepLabels[type][currentStep - 1]}
              />
              <button
                className="modal-close"
                onClick={onClose}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </header>

            {showSuccess ? (
              <SuccessState type={type} onClose={onClose} />
            ) : (
              <>
                {/* Honeypot field — hidden from real users, traps bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* ── Submission Error Banner ── */}
                {submitError && (
                  <div
                    className="form-error-banner"
                    role="alert"
                    style={{
                      padding: "12px 16px",
                      marginBottom: "16px",
                      backgroundColor: "rgba(239, 68, 68, 0.08)",
                      border: "1px solid rgba(239, 68, 68, 0.2)",
                      borderRadius: "6px",
                      color: "#f87171",
                      fontSize: "14px",
                    }}
                  >
                    {submitError}
                  </div>
                )}

                {/* ── MANDATE FORMS ── */}
                {type === "mandate" && (
                  <>
                    {currentStep === 1 && (
                      <MandateStep1
                        register={register}
                        errors={errors}
                        onNext={handleNext}
                      />
                    )}
                    {currentStep === 2 && (
                      <MandateStep2
                        register={register}
                        errors={errors}
                        watchedProducts={watchedProducts}
                        watchedVolume={watchedVolume}
                        toggleArrayItem={toggleArrayItem}
                        handleKeyPress={handleKeyPress}
                        onNext={handleNext}
                        onBack={handleBack}
                      />
                    )}
                    {currentStep === 3 && (
                      <MandateStep3
                        register={register}
                        errors={errors}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                        onBack={handleBack}
                      />
                    )}
                  </>
                )}

                {/* ── SPEAK FORMS ── */}
                {type === "speak" && (
                  <>
                    {currentStep === 1 && (
                      <SpeakStep1
                        register={register}
                        errors={errors}
                        watchedContactMethod={watchedContactMethod}
                        watchedTopics={watchedTopics}
                        setValue={setValue}
                        toggleArrayItem={toggleArrayItem}
                        handleKeyPress={handleKeyPress}
                        onNext={handleNext}
                      />
                    )}
                    {currentStep === 2 && (
                      <SpeakStep2
                        register={register}
                        errors={errors}
                        watchedTimeSlot={watchedTimeSlot}
                        setValue={setValue}
                        isSubmitting={isSubmitting}
                        handleKeyPress={handleKeyPress}
                        onSubmit={handleSubmit}
                        onBack={handleBack}
                      />
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
