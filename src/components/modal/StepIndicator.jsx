const StepIndicator = ({ currentStep, totalSteps, stepLabel }) => {
  return (
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
      <span>{stepLabel}</span>
    </div>
  );
};

export default StepIndicator;
