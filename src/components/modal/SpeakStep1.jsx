import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const SpeakStep1 = ({
  register,
  errors,
  watchedContactMethod,
  watchedTopics,
  setValue,
  toggleArrayItem,
  handleKeyPress,
  onNext,
}) => {
  return (
    <div className="form-step active">
      <div className="step-heading text-zinc-100">Your Contact Details</div>
      <div className="step-subheading">STEP 01 OF 02 · IDENTIFICATION</div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="speak-fullName">Full Name</label>
          <input
            id="speak-fullName"
            type="text"
            {...register("fullName")}
            placeholder="Your full name"
            className={errors.fullName ? "error" : ""}
          />
          <ErrorMessage error={errors.fullName} />
        </div>
        <div className="field">
          <label htmlFor="speak-company">Company Name</label>
          <input
            id="speak-company"
            type="text"
            {...register("company")}
            placeholder="Your organization"
            className={errors.company ? "error" : ""}
          />
          <ErrorMessage error={errors.company} />
        </div>
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="speak-email">Email Address</label>
          <input
            id="speak-email"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
            className={errors.email ? "error" : ""}
          />
          <ErrorMessage error={errors.email} />
        </div>
        <div className="field">
          <label htmlFor="speak-phone">Phone / WhatsApp</label>
          <input
            id="speak-phone"
            type="tel"
            {...register("phone")}
            placeholder="+1 (xxx) xxx-xxxx"
            className={errors.phone ? "error" : ""}
          />
          <ErrorMessage error={errors.phone} />
        </div>
      </div>

      <div className="field-group mb-20">
        <span className="group-label">Preferred Contact Method</span>
        <div className="contact-method-grid">
          {[
            { value: "phone", icon: Phone, label: "Phone Call" },
            { value: "whatsapp", icon: MessageCircle, label: "WhatsApp" },
          ].map((method) => {
            const IconComponent = method.icon;
            return (
              <div
                key={method.value}
                role="button"
                tabIndex={0}
                aria-pressed={watchedContactMethod === method.value}
                className={`contact-method ${
                  watchedContactMethod === method.value ? "selected" : ""
                }`}
                onClick={() =>
                  setValue("contactMethod", method.value, {
                    shouldValidate: true,
                  })
                }
                onKeyDown={handleKeyPress(() =>
                  setValue("contactMethod", method.value, {
                    shouldValidate: true,
                  })
                )}
              >
                <span
                  className="contact-method-icon"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconComponent size={24} color="white" />
                </span>
                <span className="contact-method-name">{method.label}</span>
              </div>
            );
          })}
        </div>
        <ErrorMessage error={errors.contactMethod} />
      </div>

      <div className="field-group mb-16">
        <span className="group-label">
          Discussion Topic (select all relevant)
        </span>
        <div className="priority-flags">
          {[
            "Crude Oil Purchase",
            "Seller Mandate",
            "Refined Products",
            "Compliance / KYC",
            "SPA Review",
            "General Enquiry",
          ].map((topic) => (
            <div
              key={topic}
              role="button"
              tabIndex={0}
              aria-pressed={(watchedTopics || []).includes(topic)}
              className={`priority-flag ${
                (watchedTopics || []).includes(topic) ? "selected" : ""
              }`}
              onClick={() => toggleArrayItem("topics", topic)}
              onKeyDown={handleKeyPress(() => toggleArrayItem("topics", topic))}
            >
              {topic}
            </div>
          ))}
        </div>
        <ErrorMessage error={errors.topics} />
      </div>

      <div className="form-footer">
        <div className="form-footer-left">Consultation held under NDA</div>
        <div className="form-footer-right">
          <button className="btn-next" onClick={onNext}>
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakStep1;
