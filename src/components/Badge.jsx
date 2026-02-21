import { memo } from "react";

const Badge = memo(function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-essley-blue/10 text-essley-blue border-essley-blue/20",
    primary: "bg-gradient-to-r from-essley-blue to-essley-blue-light text-white border-transparent",
    outline: "bg-transparent text-essley-blue border-essley-blue",
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border backdrop-blur-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
});

export default Badge;
