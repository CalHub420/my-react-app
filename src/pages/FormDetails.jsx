import React from "react";

function FormDetails({ form }) {
  return (
    <div>
      <h3>{form.title}</h3>
      <p>{form.description}</p>
      <p>Status: {form.status}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default FormDetails;
