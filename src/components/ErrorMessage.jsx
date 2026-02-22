import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  return (
    <div className="flex items-center gap-1.5 mt-1.5 text-red-400 text-sm">
      <AlertCircle size={14} />
      <span>{error.message}</span>
    </div>
  );
};

export default ErrorMessage;
