// FormDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

function FormDetails({ index }) {
  let { id } = useParams();
  let form = { type: "Mental Health", date: "2024-02-15", time: "14:30" };
  console.log(id);
  if (!id) {
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
