import { ArrowRight, ArrowLeft } from "lucide-react";
import ErrorMessage from "../ErrorMessage";

const SpeakStep2 = ({
  register,
  errors,
  watchedTimeSlot,
  setValue,
  isSubmitting,
  handleKeyPress,
  onSubmit,
  onBack,
}) => {
  return (
    <div className="form-step active">
      <div className="step-heading text-zinc-100">Scheduling Preference</div>
      <div className="step-subheading">STEP 02 OF 02 · AVAILABILITY</div>

      <div className="field-group mb-20">
        <span className="group-label">
          Preferred Time (Eastern Time — ET, UTC−5)
        </span>
        <div className="time-slots">
          {[
            "08:00 – 10:00",
            "10:00 – 12:00",
            "12:00 – 14:00",
            "14:00 – 16:00",
            "16:00 – 18:00",
            "Flexible / Any",
          ].map((slot) => (
            <div
              key={slot}
              role="button"
              tabIndex={0}
              aria-pressed={watchedTimeSlot === slot}
              className={`time-slot ${
                watchedTimeSlot === slot ? "selected" : ""
              }`}
              onClick={() =>
                setValue("timeSlot", slot, {
                  shouldValidate: true,
                })
              }
              onKeyDown={handleKeyPress(() =>
                setValue("timeSlot", slot, {
                  shouldValidate: true,
                })
              )}
            >
              {slot}
            </div>
          ))}
        </div>
        <ErrorMessage error={errors.timeSlot} />
      </div>

      <div className="form-grid mb-16">
        <div className="field">
          <label htmlFor="timezone">Your Timezone</label>
          <select
            id="timezone"
            {...register("timezone")}
            className={errors.timezone ? "error" : ""}
          >
            <option value="">Select your timezone</option>
            <option value="est">UTC−5 (EST — Eastern Time)</option>
            <option value="cst-us">UTC−6 (CST — Central Time)</option>
            <option value="mst">UTC−7 (MST — Mountain Time)</option>
            <option value="pst">UTC−8 (PST — Pacific Time)</option>
            <option value="gmt">UTC+0 (GMT — London)</option>
            <option value="wat">UTC+1 (WAT — Lagos)</option>
            <option value="cat">UTC+2 (CAT — Johannesburg)</option>
            <option value="eat">UTC+3 (EAT — Nairobi)</option>
            <option value="gst">UTC+4 (Gulf Standard Time)</option>
            <option value="ist">UTC+5:30 (IST — Mumbai)</option>
            <option value="cst">UTC+8 (CST — Singapore)</option>
            <option value="jst">UTC+9 (JST — Tokyo)</option>
          </select>
          <ErrorMessage error={errors.timezone} />
        </div>
        <div className="field">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            {...register("urgency")}
            className={errors.urgency ? "error" : ""}
          >
            <option value="">Select urgency</option>
            <option value="urgent">Urgent — Within 24 Hours</option>
            <option value="high">High — Within 48 Hours</option>
            <option value="standard">Standard — Within 1 Week</option>
            <option value="exploratory">Exploratory — No Rush</option>
          </select>
          <ErrorMessage error={errors.urgency} />
        </div>
      </div>

      <div className="form-grid full mb-16">
        <div className="field">
          <label htmlFor="agenda">Agenda / Preparation Notes</label>
          <textarea
            id="agenda"
            {...register("agenda")}
            placeholder="Brief description of what you'd like to discuss — helps our team prepare relevant documentation and the appropriate specialist for your call..."
            className={errors.agenda ? "error" : ""}
          />
          <ErrorMessage error={errors.agenda} />
        </div>
      </div>

      <div className="form-footer">
        <div className="form-footer-left"></div>
        <div className="form-footer-right">
          <button className="btn-back" onClick={onBack}>
            <ArrowLeft size={14} /> Back
          </button>
          <button className="btn-next" onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Request Consultation"}{" "}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakStep2;
