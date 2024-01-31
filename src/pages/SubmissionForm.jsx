import React, { useState } from "react";
import "src/styles/SubmissionForm.css";
import Logo from "../components/Logo";
import InputLabel from "../components/InputLabel";
import TextInput from "../components/TextInput";
import Checkbox from "../components/Checkbox";
import SubmitButton from "../components/SubmitButton";

async function submitFormToServer(formData) {
  try {
    const response = await fetch("http://localhost:3001/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    const result = await response.json();
    console.log("Server response:", result);
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
}

function SubmissionForm() {
  const [userInput, setUserInput] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitFormToServer({
        userInput,
        anonymous,
      });

      setSubmissionMessage("Form submitted successfully!");
    } catch (error) {
      setSubmissionMessage("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="submission-form-page">
      <Logo />
      <h1>Form Submission</h1>

      <form onSubmit={handleSubmit} className="submission-form">
        <InputLabel htmlFor="userInput">User Input:</InputLabel>
        <TextInput
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your input here..."
          textarea // Indicate that this is a textarea
        />

        <div className="anonymous-checkbox">
          <p>Would you like to submit anonymously?</p>
          <Checkbox
            id="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
            label="Yes, submit anonymously"
          />
        </div>

        <SubmitButton type="submit" className="submission-button">
          Submit
        </SubmitButton>

        {submissionMessage && <p>{submissionMessage}</p>}
      </form>
    </div>
  );
}

export default SubmissionForm;
