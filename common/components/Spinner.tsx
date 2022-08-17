import React from "react";

const Spinner = () => {
  return (
    <div
      className="navbar-nav spinner-border text-success d-lg-none"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Spinner;
