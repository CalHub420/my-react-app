// components/TextInput.js
import React from "react";

function TextInput({ id, value, onChange }) {
  return <input type="text" id={id} value={value} onChange={onChange} />;
}

export default TextInput;
