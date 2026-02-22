import { useEffect, useRef, useReducer } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { getSchemaForStep } from "@/schemas/modalFormSchemas";
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

  // Get current schema for validation
  const currentSchema = getSchemaForStep(type, currentStep);

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    trigger,
    reset,
  } = useForm({
    resolver: zodResolver(currentSchema),
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // watch is stable and doesn't need to be in dependencies

  // Form persistence
  const { clearPersistedData, saveImmediately } = useFormPersistence(
    `modal-form-${type}`,
    formData,
    (newData) => {
      dispatch({ type: "SET_FORM_DATA", payload: newData });
      // Update react-hook-form values
      Object.keys(newData).forEach((key) => {
        setValue(key, newData[key]);
      });
    },
    isOpen,
    500 // debounce 500ms
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
      // Reset on close
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

  // Accessibility helper for keyboard navigation
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
    setValue(field, newValue, { shouldValidate: true, shouldDirty: true });
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    const isValid = await trigger();

    if (isValid) {
      if (currentStep < totalSteps) {
        dispatch({ type: "NEXT_STEP" });
        saveImmediately(); // Save progress when moving to next step
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementsByName(firstError)[0];
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.focus();
        }
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      dispatch({ type: "PREV_STEP" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (validatedData) => {
    try {
      // Generate reference number
      const refNum = Math.floor(100000 + Math.random() * 900000);

      // Here you would typically send the data to your backend
      console.log("Form submitted:", { ...validatedData, reference: refNum });

      // TODO: Replace with actual API call
      // await submitFormData({ ...validatedData, reference: refNum });

      dispatch({ type: "SET_SUCCESS", payload: true });
      clearPersistedData(); // Clear saved data after successful submission
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle submission error (show error message to user)
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
        {/* Scan line animation */}
        <div className="modal-scan" />

        {/* Progress bar */}
        <div className="modal-progress">
          <div
            className="modal-progress-bar"
            style={{ width: progressWidth }}
          />
        </div>

        <div className="modal-inner">
          {/* SIDEBAR */}
          <ModalSidebar type={type} />

          {/* CONTENT */}
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

            {/* SUCCESS STATE */}
            {showSuccess ? (
              <SuccessState type={type} onClose={onClose} />
            ) : (
              <>
                {/* MANDATE FORMS */}
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
                        onSubmit={handleFormSubmit(handleSubmit)}
                        onBack={handleBack}
                      />
                    )}
                  </>
                )}

                {/* SPEAK FORMS */}
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
                        onSubmit={handleFormSubmit(handleSubmit)}
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
