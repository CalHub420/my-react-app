// components/Checkbox.js
import React from "react";

function Checkbox({ id, checked, onChange, label }) {
  return (
    <div>
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
