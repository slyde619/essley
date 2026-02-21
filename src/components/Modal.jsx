import { useEffect, useRef, useState } from "react";
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  Phone,
  MessageCircle,
  Video,
} from "lucide-react";

const Modal = ({ isOpen, onClose, type = "mandate" }) => {
  const dialogRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
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
  });

  const totalSteps = type === "mandate" ? 3 : 2;
  const progressWidth = `${(currentStep / totalSteps) * 100}%`;

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
        setCurrentStep(1);
        setShowSuccess(false);
        setFormData({
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
          contactMethod: "phone",
          topics: [],
          timeSlot: "",
          timezone: "",
          urgency: "",
          agenda: "",
        });
      }, 300);
    }
  }, [isOpen]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayItem = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Generate reference number
    const refNum = Math.floor(100000 + Math.random() * 900000);
    console.log("Form submitted:", { ...formData, reference: refNum });
    setShowSuccess(true);
  };

  const formatVolume = (val) => {
    const num = parseInt(val);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(".0", "") + "M";
    }
    return (num / 1000).toFixed(0) + "K";
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
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
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
          <aside className="modal-sidebar">
            <div className="modal-sidebar-bg" />
            <div className="modal-sidebar-lines" />

            <div className="modal-type-badge">
              {type === "mandate" ? "Buyer Mandate" : "Consultation"}
            </div>

            <h2 className="modal-sidebar-title ">
              {type === "mandate" ? (
                <>
                  <span className="text-zinc-100">Submit Your</span>
                  <br />
                  <em>Mandate</em>
                </>
              ) : (
                <>
                  <span className="text-zinc-100">Speak With</span>
                  <br />
                  <em>Our Team</em>
                </>
              )}
            </h2>

            <p className="modal-sidebar-desc">
              {type === "mandate"
                ? "Our team reviews all mandate submissions and responds only to qualified buyers within 48 business hours."
                : "Request a direct consultation with a member of our brokerage team. Available by call, video, or WhatsApp."}
            </p>

            <div className="modal-divider" />

            <ul className="modal-checklist">
              {type === "mandate" ? (
                <>
                  <li>
                    Verified seller mandates available for all five product
                    lines
                  </li>
                  <li>Minimum cargo volumes strictly enforced</li>
                  <li>All transactions under NCND protection</li>
                  <li>KYC package required at next stage</li>
                  <li>SCO issued upon buyer qualification</li>
                </>
              ) : (
                <>
                  <li>Direct access to senior brokerage personnel</li>
                  <li>Consultation held under NDA by default</li>
                  <li>No obligation — exploratory discussions welcome</li>
                  <li>Available Mon–Fri, 08:00–18:00 WAT</li>
                  <li>WhatsApp available for urgent enquiries</li>
                </>
              )}
            </ul>

            <div className="modal-sidebar-footer">
              <div className="modal-confidential">
                {type === "mandate"
                  ? "Confidential Submission"
                  : "Strictly Confidential"}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="modal-content">
            <header className="modal-header">
              <div className="modal-step-indicator">
                <div className="step-dots">
                  {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                      key={i}
                      className={`step-dot ${
                        i + 1 === currentStep
                          ? "active"
                          : i + 1 < currentStep
                            ? "done"
                            : ""
                      }`}
                    />
                  ))}
                </div>
                <span>{stepLabels[type][currentStep - 1]}</span>
              </div>
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
              <div className="success-state visible">
                <div className="success-icon-wrap">
                  <Check className="success-check" size={32} />
                </div>
                <div className="success-ref">
                  REF: {type === "mandate" ? "EST" : "CON"}-
                  {Math.floor(100000 + Math.random() * 900000)}
                </div>
                <h3 className="success-title">
                  {type === "mandate"
                    ? "Mandate Received"
                    : "Request Confirmed"}
                </h3>
                <p className="success-desc">
                  {type === "mandate"
                    ? "Your buyer mandate has been submitted successfully. Our brokerage team will review your submission and respond to qualified mandates within 48 business hours."
                    : "Your consultation request has been received. A member of our brokerage team will contact you at your specified time to confirm the appointment."}
                </p>
                <div className="success-next-steps">
                  <h4>
                    {type === "mandate"
                      ? "What Happens Next"
                      : "Consultation Protocol"}
                  </h4>
                  <ul>
                    {type === "mandate" ? (
                      <>
                        <li>
                          <span className="sn">01</span> Compliance team
                          initiates KYC review of your entity
                        </li>
                        <li>
                          <span className="sn">02</span> Financial capacity and
                          mandate authenticity verified
                        </li>
                        <li>
                          <span className="sn">03</span> Qualified buyers
                          receive formal SCO from seller mandate
                        </li>
                        <li>
                          <span className="sn">04</span> ICPO exchange and SPA
                          process commences
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <span className="sn">01</span> Confirmation email sent
                          within 2 business hours
                        </li>
                        <li>
                          <span className="sn">02</span> NDA executed prior to
                          discussion commencement
                        </li>
                        <li>
                          <span className="sn">03</span> Senior specialist
                          assigned to your enquiry
                        </li>
                        <li>
                          <span className="sn">04</span> Follow-up documentation
                          provided post-call
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <button className="btn-close-success" onClick={onClose}>
                  Close Window
                </button>
              </div>
            ) : (
              <>
                {/* MANDATE FORMS */}
                {type === "mandate" && (
                  <>
                    {/* Step 1: Company Info */}
                    {currentStep === 1 && (
                      <div className="form-step active">
                        <div className="step-heading text-zinc-100">
                          Company Information
                        </div>
                        <div className="step-subheading">
                          STEP 01 OF 03 · ENTITY IDENTIFICATION
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Full Legal Name</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="field">
                            <label>Designation / Title</label>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="e.g. Director of Procurement"
                            />
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Company Name</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Registered company name"
                            />
                          </div>
                          <div className="field">
                            <label>Country of Incorporation</label>
                            <input
                              type="text"
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              placeholder="e.g. United Kingdom"
                            />
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Corporate Email</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="name@company.com"
                            />
                          </div>
                          <div className="field">
                            <label>Phone / WhatsApp</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (xxx) xxx-xxxx"
                            />
                          </div>
                        </div>

                        <div className="form-grid full mb-16">
                          <div className="field">
                            <label>Company Registration Number</label>
                            <input
                              type="text"
                              name="registrationNumber"
                              value={formData.registrationNumber}
                              onChange={handleInputChange}
                              placeholder="Official company registration / incorporation number"
                            />
                          </div>
                        </div>

                        <div className="form-footer">
                          <div className="form-footer-left">
                            All information is held in strict confidence
                          </div>
                          <div className="form-footer-right">
                            <button className="btn-next" onClick={handleNext}>
                              Continue <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Product & Volume */}
                    {currentStep === 2 && (
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
                                className={`product-pill ${
                                  formData.products.includes(product)
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() =>
                                  toggleArrayItem("products", product)
                                }
                              >
                                {product}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="field-group mb-20">
                          <span className="group-label">
                            Monthly Volume Requirement
                          </span>
                          <div className="volume-display">
                            {formatVolume(formData.volume)},000 <em>BBL/mo</em>
                          </div>
                          <div className="volume-track">
                            <input
                              type="range"
                              className="volume-slider"
                              name="volume"
                              min="500000"
                              max="5000000"
                              step="100000"
                              value={formData.volume}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="volume-labels">
                            <span>500K BBL</span>
                            <span>1M BBL</span>
                            <span>2M BBL</span>
                            <span>3.5M BBL</span>
                            <span>5M BBL</span>
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Preferred Delivery Terms</label>
                            <select
                              name="deliveryTerms"
                              value={formData.deliveryTerms}
                              onChange={handleInputChange}
                            >
                              <option value="">Select delivery basis</option>
                              <option value="fob">FOB — Free on Board</option>
                              <option value="cif">
                                CIF — Cost, Insurance, Freight
                              </option>
                              <option value="either">
                                Either — Open to Negotiation
                              </option>
                            </select>
                          </div>
                          <div className="field">
                            <label>Destination Port / Country</label>
                            <input
                              type="text"
                              name="destinationPort"
                              value={formData.destinationPort}
                              onChange={handleInputChange}
                              placeholder="e.g. Rotterdam, Netherlands"
                            />
                          </div>
                        </div>

                        <div className="form-grid full mb-16">
                          <div className="field">
                            <label>Preferred Contract Duration</label>
                            <select
                              name="contractDuration"
                              value={formData.contractDuration}
                              onChange={handleInputChange}
                            >
                              <option value="">Select duration</option>
                              <option value="spot">
                                Single Lifting (Spot)
                              </option>
                              <option value="3m">3 Months</option>
                              <option value="6m">6 Months</option>
                              <option value="12m">12 Months</option>
                              <option value="24m">24 Months+</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-footer">
                          <div className="form-footer-left"></div>
                          <div className="form-footer-right">
                            <button className="btn-back" onClick={handleBack}>
                              <ArrowLeft size={14} /> Back
                            </button>
                            <button className="btn-next" onClick={handleNext}>
                              Continue <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Transaction Details */}
                    {currentStep === 3 && (
                      <div className="form-step active">
                        <div className="step-heading text-zinc-100">
                          Transaction Details
                        </div>
                        <div className="step-subheading">
                          STEP 03 OF 03 · COMMERCIAL CONTEXT
                        </div>

                        <div className="form-grid full mb-16">
                          <div className="field">
                            <label>Financial Instrument Available</label>
                            <select
                              name="financialInstrument"
                              value={formData.financialInstrument}
                              onChange={handleInputChange}
                            >
                              <option value="">
                                Select payment instrument
                              </option>
                              <option value="lc">
                                LC — Irrevocable Letter of Credit
                              </option>
                              <option value="sblc">
                                SBLC — Standby Letter of Credit
                              </option>
                              <option value="bcl">
                                BCL — Bank Comfort Letter
                              </option>
                              <option value="pof">Proof of Funds (POF)</option>
                              <option value="tt">
                                TT — Telegraphic Transfer
                              </option>
                              <option value="undisclosed">
                                Undisclosed — Available on Request
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>End-Use / Industry</label>
                            <select
                              name="endUse"
                              value={formData.endUse}
                              onChange={handleInputChange}
                            >
                              <option value="">Select end use</option>
                              <option value="refinery">
                                Refinery Feedstock
                              </option>
                              <option value="power">Power Generation</option>
                              <option value="aviation">
                                Aviation Fuel Supply
                              </option>
                              <option value="industrial">
                                Industrial Operations
                              </option>
                              <option value="marine">Marine Bunkering</option>
                              <option value="distribution">
                                Downstream Distribution
                              </option>
                              <option value="government">
                                Government Procurement
                              </option>
                            </select>
                          </div>
                          <div className="field">
                            <label>How Did You Hear About Us</label>
                            <select
                              name="source"
                              value={formData.source}
                              onChange={handleInputChange}
                            >
                              <option value="">Select source</option>
                              <option value="referral">
                                Referral / Network
                              </option>
                              <option value="search">Online Search</option>
                              <option value="event">Industry Event</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-grid full mb-16">
                          <div className="field">
                            <label>Additional Information / Notes</label>
                            <textarea
                              name="notes"
                              value={formData.notes}
                              onChange={handleInputChange}
                              placeholder="Any additional context, specific requirements, or questions for our brokerage team..."
                            />
                          </div>
                        </div>

                        <div className="form-footer">
                          <div className="form-footer-left">
                            Submission triggers NDA protocol
                          </div>
                          <div className="form-footer-right">
                            <button className="btn-back" onClick={handleBack}>
                              <ArrowLeft size={14} /> Back
                            </button>
                            <button className="btn-next" onClick={handleSubmit}>
                              Submit Mandate <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* SPEAK FORMS */}
                {type === "speak" && (
                  <>
                    {/* Step 1: Contact Details */}
                    {currentStep === 1 && (
                      <div className="form-step active">
                        <div className="step-heading text-zinc-100">
                          Your Contact Details
                        </div>
                        <div className="step-subheading">
                          STEP 01 OF 02 · IDENTIFICATION
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Full Name</label>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Your full name"
                            />
                          </div>
                          <div className="field">
                            <label>Company Name</label>
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Your organization"
                            />
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Email Address</label>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="name@company.com"
                            />
                          </div>
                          <div className="field">
                            <label>Phone / WhatsApp</label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (xxx) xxx-xxxx"
                            />
                          </div>
                        </div>

                        <div className="field-group mb-20">
                          <span className="group-label">
                            Preferred Contact Method
                          </span>
                          <div className="contact-method-grid">
                            {[
                              {
                                value: "phone",
                                icon: Phone,
                                label: "Phone Call",
                              },
                              {
                                value: "whatsapp",
                                icon: MessageCircle,
                                label: "WhatsApp",
                              },
                              {
                                value: "video",
                                icon: Video,
                                label: "Video Call",
                              },
                            ].map((method) => {
                              const IconComponent = method.icon;
                              return (
                                <div
                                  key={method.value}
                                  className={`contact-method ${
                                    formData.contactMethod === method.value
                                      ? "selected"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    setFormData((prev) => ({
                                      ...prev,
                                      contactMethod: method.value,
                                    }))
                                  }
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
                                  <span className="contact-method-name">
                                    {method.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
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
                                className={`priority-flag ${
                                  formData.topics.includes(topic)
                                    ? "selected"
                                    : ""
                                }`}
                                onClick={() => toggleArrayItem("topics", topic)}
                              >
                                {topic}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="form-footer">
                          <div className="form-footer-left">
                            Consultation held under NDA
                          </div>
                          <div className="form-footer-right">
                            <button className="btn-next" onClick={handleNext}>
                              Continue <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Scheduling */}
                    {currentStep === 2 && (
                      <div className="form-step active">
                        <div className="step-heading text-zinc-100">
                          Scheduling Preference
                        </div>
                        <div className="step-subheading">
                          STEP 02 OF 02 · AVAILABILITY
                        </div>

                        <div className="field-group mb-20">
                          <span className="group-label">
                            Preferred Time (West Africa Time — WAT, UTC+1)
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
                                className={`time-slot ${
                                  formData.timeSlot === slot ? "selected" : ""
                                }`}
                                onClick={() =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    timeSlot: slot,
                                  }))
                                }
                              >
                                {slot}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="form-grid mb-16">
                          <div className="field">
                            <label>Your Timezone</label>
                            <select
                              name="timezone"
                              value={formData.timezone}
                              onChange={handleInputChange}
                            >
                              <option value="">Select your timezone</option>
                              <option value="est">
                                UTC−5 (EST — New York)
                              </option>
                              <option value="pst">
                                UTC−8 (PST — Los Angeles)
                              </option>
                              <option value="gmt">UTC+0 (GMT — London)</option>
                              <option value="wat">UTC+1 (WAT — Lagos)</option>
                              <option value="cat">
                                UTC+2 (CAT — Johannesburg)
                              </option>
                              <option value="eat">UTC+3 (EAT — Nairobi)</option>
                              <option value="gst">
                                UTC+4 (Gulf Standard Time)
                              </option>
                              <option value="ist">
                                UTC+5:30 (IST — Mumbai)
                              </option>
                              <option value="cst">
                                UTC+8 (CST — Singapore)
                              </option>
                              <option value="jst">UTC+9 (JST — Tokyo)</option>
                            </select>
                          </div>
                          <div className="field">
                            <label>Urgency Level</label>
                            <select
                              name="urgency"
                              value={formData.urgency}
                              onChange={handleInputChange}
                            >
                              <option value="">Select urgency</option>
                              <option value="urgent">
                                Urgent — Within 24 Hours
                              </option>
                              <option value="high">
                                High — Within 48 Hours
                              </option>
                              <option value="standard">
                                Standard — Within 1 Week
                              </option>
                              <option value="exploratory">
                                Exploratory — No Rush
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="form-grid full mb-16">
                          <div className="field">
                            <label>Agenda / Preparation Notes</label>
                            <textarea
                              name="agenda"
                              value={formData.agenda}
                              onChange={handleInputChange}
                              placeholder="Brief description of what you'd like to discuss — helps our team prepare relevant documentation and the appropriate specialist for your call..."
                            />
                          </div>
                        </div>

                        <div className="form-footer">
                          <div className="form-footer-left"></div>
                          <div className="form-footer-right">
                            <button className="btn-back" onClick={handleBack}>
                              <ArrowLeft size={14} /> Back
                            </button>
                            <button className="btn-next" onClick={handleSubmit}>
                              Request Consultation <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
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
