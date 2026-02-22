import { ArrowRight } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const MandateStep1 = ({ register, errors, onNext }) => {
  return (
    <div className="form-step active">
      <div className="step-heading text-zinc-100">Company Information</div>
      <div className="step-subheading">
        STEP 01 OF 03 · ENTITY IDENTIFICATION
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="fullName">Full Legal Name</label>
          <input
            id="fullName"
            type="text"
            {...register("fullName")}
            placeholder="Your full name"
            className={errors.fullName ? "error" : ""}
          />
          <ErrorMessage error={errors.fullName} />
        </div>
        <div className="field">
          <label htmlFor="title">Designation / Title</label>
          <input
            id="title"
            type="text"
            {...register("title")}
            placeholder="e.g. Director of Procurement"
            className={errors.title ? "error" : ""}
          />
          <ErrorMessage error={errors.title} />
        </div>
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="company">Company Name</label>
          <input
            id="company"
            type="text"
            {...register("company")}
            placeholder="Registered company name"
            className={errors.company ? "error" : ""}
          />
          <ErrorMessage error={errors.company} />
        </div>
        <div className="field">
          <label htmlFor="country">Country of Incorporation</label>
          <input
            id="country"
            type="text"
            {...register("country")}
            placeholder="e.g. United Kingdom"
            className={errors.country ? "error" : ""}
          />
          <ErrorMessage error={errors.country} />
        </div>
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="email">Corporate Email</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            placeholder="name@company.com"
            className={errors.email ? "error" : ""}
          />
          <ErrorMessage error={errors.email} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone / WhatsApp</label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            placeholder="+1 (xxx) xxx-xxxx"
            className={errors.phone ? "error" : ""}
          />
          <ErrorMessage error={errors.phone} />
        </div>
      </div>

      <div className="form-grid full mb-16">
        <div className="field">
          <label htmlFor="registrationNumber">
            Company Registration Number
          </label>
          <input
            id="registrationNumber"
            type="text"
            {...register("registrationNumber")}
            placeholder="Official company registration / incorporation number"
            className={errors.registrationNumber ? "error" : ""}
          />
          <ErrorMessage error={errors.registrationNumber} />
        </div>
      </div>

      <div className="form-footer">
        <div className="form-footer-left">
          All information is held in strict confidence
        </div>
        <div className="form-footer-right">
          <button className="btn-next" onClick={onNext}>
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MandateStep1;
