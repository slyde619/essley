import { useEffect, useRef, useReducer } from "react";
import { useForm } from "react-hook-form";
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

const initialFormData = {
  // Mandate fields
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
    case "RESET":
      return {
        currentStep: 1,
        showSuccess: false,
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

const Modal = ({ isOpen, onClose, type = "mandate" }) => {
  const dialogRef = useRef(null);
  const [state, dispatch] = useReducer(modalReducer, {
    currentStep: 1,
    showSuccess: false,
    formData: initialFormData,
  });

  const { currentStep, showSuccess, formData } = state;

  const totalSteps = type === "mandate" ? 3 : 2;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

  // Initialize react-hook-form WITHOUT zodResolver
  // Validation is handled manually per-step using Zod's safeParse
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

  // Sync form values with formData state for persistence
  useEffect(() => {
    const subscription = watch((value) => {
      dispatch({ type: "UPDATE_FORM_DATA", payload: value });
    });
    return () => subscription.unsubscribe();
  }, []);

  // Form persistence
  const { clearPersistedData, saveImmediately } = useFormPersistence(
    `modal-form-${type}`,
    formData,
    (newData) => {
      dispatch({ type: "SET_FORM_DATA", payload: newData });
      Object.keys(newData).forEach((key) => {
        setValue(key, newData[key]);
      });
    },
    isOpen,
    500,
  );

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
        clearPersistedData();
      }, 300);
    }
  }, [isOpen, reset, clearPersistedData]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
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

  /**
   * Validate only the current step's fields using Zod's safeParse.
   * Maps errors back to react-hook-form via setError so ErrorMessage components work.
   */
  const validateCurrentStep = () => {
    const schema = getSchemaForStep(type, currentStep);

    // Use formData from the reducer — it stays in sync via the watch() subscription
    // getValues() can return stale defaultValues in some cases
    const stepFieldNames = Object.keys(schema.shape);
    const stepValues = {};
    stepFieldNames.forEach((key) => {
      stepValues[key] = formData[key];
    });

    // Clear only this step's field errors before re-validating
    clearErrors(stepFieldNames);

    const result = schema.safeParse(stepValues);

    if (!result.success) {
      const issues = result.error?.issues || [];
      issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (fieldName) {
          setError(fieldName, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    const isValid = validateCurrentStep();

    if (isValid) {
      if (currentStep < totalSteps) {
        dispatch({ type: "NEXT_STEP" });
        saveImmediately();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Scroll to first error element
      setTimeout(() => {
        const firstErrorEl = document.querySelector(".error");
        if (firstErrorEl) {
          firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
          firstErrorEl.focus();
        }
      }, 50);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      clearErrors();
      dispatch({ type: "PREV_STEP" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    // Validate the current (final) step first
    const isStepValid = validateCurrentStep();
    if (!isStepValid) return;

    // Full-form validation as a safety net
    const completeSchema =
      type === "mandate" ? completeMandateSchema : completeSpeakSchema;
    const result = completeSchema.safeParse(formData);

    if (!result.success) {
      console.error("Full form validation failed:", result.error?.issues);
      const issues = result.error?.issues || [];
      issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (fieldName) {
          setError(fieldName, {
            type: "manual",
            message: issue.message,
          });
        }
      });
      return;
    }

    try {
      const refNum = Math.floor(100000 + Math.random() * 900000);
      console.log("Form submitted:", { ...result.data, reference: refNum });

      // TODO: Replace with actual API call
      // await submitFormData({ ...result.data, reference: refNum });

      dispatch({ type: "SET_SUCCESS", payload: true });
      clearPersistedData();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

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
        if (e.key === "Escape") {
          onClose();
        }
      }}
    >
      <div
        className="modal-panel"
        role="document"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="modal-scan" />

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
