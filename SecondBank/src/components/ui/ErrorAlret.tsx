import React from "react";

interface ErrorAlertProps {
  error: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ error }) => {
  return (
    <div className="bg-red-100  text-red secondary-text mb-4"  role="alert">
      <strong>Error:</strong>
      <span className="block sm:inline"> {error}</span>
    </div>
  );
};

export default ErrorAlert;
