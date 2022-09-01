import React from "react";

interface SpinnerProps {
    color?: "success" | "warning"
}

const Spinner = ({color='success'}: SpinnerProps) => {
  return (
    <div
      className={`spinner-border text-${color}`}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
