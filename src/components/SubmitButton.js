// components/SubmitButton.js
import React from "react";

function SubmitButton({ onClick, children }) {
  return (
    <button type="submit" onClick={onClick}>
      {children}
    </button>
  );
}

export default SubmitButton;
