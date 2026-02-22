const ModalSidebar = ({ type }) => {
  return (
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
          : "Request a direct consultation with a member of our brokerage team. Available by phone or WhatsApp."}
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
  );
};

export default ModalSidebar;
