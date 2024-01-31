// components/InputLabel.js
import React from "react";

function InputLabel({ htmlFor, children }) {
  return <label htmlFor={htmlFor}>{children}</label>;
}

export default InputLabel;
