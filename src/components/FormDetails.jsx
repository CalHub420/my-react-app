// FormDetails.jsx
import React from "react";

function FormDetails({ form }) {
  if (!form) {
    return <div>Form not found</div>;
  }

  return (
    <div>
      <h2>{form.type} Form</h2>
      <p>Date: {form.date}</p>
      <p>Time: {form.time}</p>
      {/* Add additional form fields as needed */}
      <p>Employee Issue: {form.employeeIssue}</p>

      {/* Add HR response form */}
      <textarea placeholder="Type your response..." />
      <button>Submit Response</button>
    </div>
  );
}

export default FormDetails;
