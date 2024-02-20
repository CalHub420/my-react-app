import React, { useState } from "react";
//import "src/styles/SubmissionForm.css";
import Logo from "../components/Logo";
import { Form, Container, Button } from "react-bootstrap";

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

function CreateSubmission() {
  const [userInput, setUserInput] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [selectedSupportOption, setSelectedSupportOption] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");

  const supportOptions = [
    "Mental Health",
    "Grievance",
    "Discipline Queries",
    "Policy Question",
    "Other",
  ]; // Customize options

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await submitFormToServer({
        userInput,
        anonymous,
        selectedSupportOption,
      });

      setSubmissionMessage("Form submitted successfully!");
    } catch (error) {
      setSubmissionMessage("Failed to submit form. Please try again.");
    }
  };

  return (
    <div className="submission-form-page d-flex align-items-center justify-content-center vh-100">
      <Container>
        <h1 style={{ color: "white" }}>Form Submission</h1>

        <Form onSubmit={handleSubmit} className="submission-form">
          <Form.Group controlId="supportOption" className="support-dropdown">
            <Form.Label>Choose Your Support Option:</Form.Label>
            <Form.Control
              as="select"
              value={selectedSupportOption}
              onChange={(e) => setSelectedSupportOption(e.target.value)}
            >
              <option value="" disabled>
                Select an option
              </option>
              {supportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="userInput" className="submission-form my-4">
            <Form.Label>Share your thoughts or concerns with us:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your input here..."
            />
          </Form.Group>

          <Form.Group controlId="anonymous" className="anonymous-checkbox">
            <Form.Check
              type="checkbox"
              label="Yes, submit anonymously"
              checked={anonymous}
              onChange={() => setAnonymous(!anonymous)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="submission-button my-4"
          >
            Submit
          </Button>

          {submissionMessage && <p>{submissionMessage}</p>}
        </Form>
      </Container>
    </div>
  );
}

export default CreateSubmission;
