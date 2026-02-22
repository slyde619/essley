import { ArrowRight, ArrowLeft } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const MandateStep3 = ({
  register,
  errors,
  isSubmitting,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="form-step active">
      <div className="step-heading text-zinc-100">Transaction Details</div>
      <div className="step-subheading">
        STEP 03 OF 03 · COMMERCIAL CONTEXT
      </div>

      <div className="form-grid full mb-16">
        <div className="field">
          <label htmlFor="financialInstrument">
            Financial Instrument Available
          </label>
          <select
            id="financialInstrument"
            {...register("financialInstrument")}
            className={errors.financialInstrument ? "error" : ""}
          >
            <option value="">Select payment instrument</option>
            <option value="lc">LC — Irrevocable Letter of Credit</option>
            <option value="sblc">SBLC — Standby Letter of Credit</option>
            <option value="bcl">BCL — Bank Comfort Letter</option>
            <option value="pof">Proof of Funds (POF)</option>
            <option value="tt">TT — Telegraphic Transfer</option>
            <option value="undisclosed">
              Undisclosed — Available on Request
            </option>
          </select>
          <ErrorMessage error={errors.financialInstrument} />
        </div>
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="endUse">End-Use / Industry</label>
          <select
            id="endUse"
            {...register("endUse")}
            className={errors.endUse ? "error" : ""}
          >
            <option value="">Select end use</option>
            <option value="refinery">Refinery Feedstock</option>
            <option value="power">Power Generation</option>
            <option value="aviation">Aviation Fuel Supply</option>
            <option value="industrial">Industrial Operations</option>
            <option value="marine">Marine Bunkering</option>
            <option value="distribution">Downstream Distribution</option>
            <option value="government">Government Procurement</option>
          </select>
          <ErrorMessage error={errors.endUse} />
        </div>
        <div className="field">
          <label htmlFor="source">How Did You Hear About Us</label>
          <select
            id="source"
            {...register("source")}
            className={errors.source ? "error" : ""}
          >
            <option value="">Select source</option>
            <option value="referral">Referral / Network</option>
            <option value="search">Online Search</option>
            <option value="event">Industry Event</option>
            <option value="linkedin">LinkedIn</option>
            <option value="other">Other</option>
          </select>
          <ErrorMessage error={errors.source} />
        </div>
      </div>

      <div className="form-grid full mb-16">
        <div className="field">
          <label htmlFor="notes">Additional Information / Notes</label>
          <textarea
            id="notes"
            {...register("notes")}
            placeholder="Any additional context, specific requirements, or questions for our brokerage team..."
            className={errors.notes ? "error" : ""}
          />
          <ErrorMessage error={errors.notes} />
        </div>
      </div>

      <div className="form-footer">
        <div className="form-footer-left">Submission triggers NDA protocol</div>
        <div className="form-footer-right">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={14} /> Back
          </button>
          <button className="btn-next" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Mandate"}{" "}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MandateStep3;
