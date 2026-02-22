import { ArrowRight, ArrowLeft } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const MandateStep2 = ({
  register,
  errors,
  watchedProducts,
  watchedVolume,
  toggleArrayItem,
  handleKeyPress,
  onNext,
  onBack,
}) => {
  const formatVolume = (val) => {
    const num = parseInt(val);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(".0", "") + "M";
    }
    return (num / 1000).toFixed(0) + "K";
  };

  return (
    <div className="form-step active">
      <div className="step-heading text-zinc-100">
        Product & Volume Requirement
      </div>
      <div className="step-subheading">
        STEP 02 OF 03 · COMMERCIAL SPECIFICATION
      </div>

      <div className="field-group mb-20">
        <span className="group-label">
          Product of Interest (select all that apply)
        </span>
        <div className="product-pills">
          {[
            "Bonny Light Crude",
            "Brent Crude Oil",
            "Jet Fuel A-1",
            "EN590 Diesel",
            "D6 Fuel Oil",
          ].map((product) => (
            <div
              key={product}
              role="button"
              tabIndex={0}
              aria-pressed={(watchedProducts || []).includes(product)}
              className={`product-pill ${
                (watchedProducts || []).includes(product) ? "selected" : ""
              }`}
              onClick={() => toggleArrayItem("products", product)}
              onKeyDown={handleKeyPress(() =>
                toggleArrayItem("products", product)
              )}
            >
              {product}
            </div>
          ))}
        </div>
        <ErrorMessage error={errors.products} />
      </div>

      <div className="field-group mb-20">
        <span className="group-label">Monthly Volume Requirement</span>
        <div className="volume-display">
          {formatVolume(watchedVolume || 1000000)},000 <em>BBL/mo</em>
        </div>
        <div className="volume-track">
          <input
            type="range"
            className="volume-slider"
            min="500000"
            max="5000000"
            step="100000"
            {...register("volume", { valueAsNumber: true })}
          />
        </div>
        <div className="volume-labels">
          <span>500K BBL</span>
          <span>1M BBL</span>
          <span>2M BBL</span>
          <span>3.5M BBL</span>
          <span>5M BBL</span>
        </div>
        <ErrorMessage error={errors.volume} />
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="deliveryTerms">Preferred Delivery Terms</label>
          <select
            id="deliveryTerms"
            {...register("deliveryTerms")}
            className={errors.deliveryTerms ? "error" : ""}
          >
            <option value="">Select delivery basis</option>
            <option value="fob">FOB — Free on Board</option>
            <option value="cif">CIF — Cost, Insurance, Freight</option>
            <option value="either">Either — Open to Negotiation</option>
          </select>
          <ErrorMessage error={errors.deliveryTerms} />
        </div>
        <div className="field">
          <label htmlFor="destinationPort">Destination Port / Country</label>
          <input
            id="destinationPort"
            type="text"
            {...register("destinationPort")}
            placeholder="e.g. Rotterdam, Netherlands"
            className={errors.destinationPort ? "error" : ""}
          />
          <ErrorMessage error={errors.destinationPort} />
        </div>
      </div>

      <div className="form-grid full mb-16">
        <div className="field">
          <label htmlFor="contractDuration">Preferred Contract Duration</label>
          <select
            id="contractDuration"
            {...register("contractDuration")}
            className={errors.contractDuration ? "error" : ""}
          >
            <option value="">Select duration</option>
            <option value="spot">Single Lifting (Spot)</option>
            <option value="3m">3 Months</option>
            <option value="6m">6 Months</option>
            <option value="12m">12 Months</option>
            <option value="24m">24 Months+</option>
          </select>
          <ErrorMessage error={errors.contractDuration} />
        </div>
      </div>

      <div className="form-footer">
        <div className="form-footer-left"></div>
        <div className="form-footer-right">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={14} /> Back
          </button>
          <button className="btn-next" onClick={onNext}>
            Continue <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MandateStep2;
