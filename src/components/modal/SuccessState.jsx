import { Check } from "lucide-react";

const SuccessState = ({ type, onClose }) => {
  return (
    <div className="success-state visible">
      <div className="success-icon-wrap">
        <Check className="success-check" size={32} />
      </div>
      <div className="success-ref">
        REF: {type === "mandate" ? "EST" : "CON"}-
        {Math.floor(100000 + Math.random() * 900000)}
      </div>
      <h3 className="success-title text-zinc-100">
        {type === "mandate" ? "Mandate Received" : "Request Confirmed"}
      </h3>
      <p className="success-desc">
        {type === "mandate"
          ? "Your buyer mandate has been submitted successfully. Our brokerage team will review your submission and respond to qualified mandates within 48 business hours."
          : "Your consultation request has been received. A member of our brokerage team will contact you at your specified time to confirm the appointment."}
      </p>
      <div className="success-next-steps">
        <h4>
          {type === "mandate" ? "What Happens Next" : "Consultation Protocol"}
        </h4>
        <ul>
          {type === "mandate" ? (
            <>
              <li>
                <span className="sn">01</span> Compliance team initiates KYC
                review of your entity
              </li>
              <li>
                <span className="sn">02</span> Financial capacity and mandate
                authenticity verified
              </li>
              <li>
                <span className="sn">03</span> Qualified buyers receive formal
                SCO from seller mandate
              </li>
              <li>
                <span className="sn">04</span> ICPO exchange and SPA process
                commences
              </li>
            </>
          ) : (
            <>
              <li>
                <span className="sn">01</span> Confirmation email sent within 2
                business hours
              </li>
              <li>
                <span className="sn">02</span> NDA executed prior to discussion
                commencement
              </li>
              <li>
                <span className="sn">03</span> Senior specialist assigned to
                your enquiry
              </li>
              <li>
                <span className="sn">04</span> Follow-up documentation provided
                post-call
              </li>
            </>
          )}
        </ul>
      </div>
      <button className="btn-close-success" onClick={onClose}>
        Close Window
      </button>
    </div>
  );
};

export default SuccessState;
