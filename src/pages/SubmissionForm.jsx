import React, { useState } from "react";
import "src/styles/SubmissionForm.css";
import Logo from "../components/Logo";
import { Form, Container, Row, Col, Button } from "react-bootstrap";

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
      <Container>
        <h1>Form Submission</h1>

        <Form onSubmit={handleSubmit} className="submission-form">
          <Form.Group controlId="userInput">
            <Form.Label>User Input:</Form.Label>
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

          <Button variant="primary" type="submit" className="submission-button">
            Submit
          </Button>

          {submissionMessage && <p>{submissionMessage}</p>}
        </Form>
      </Container>
    </div>
  );
}

export default SubmissionForm;
