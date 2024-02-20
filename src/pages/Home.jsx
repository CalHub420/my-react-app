import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="submission-form-page d-flex align-items-center justify-content-center vh-100">
      <div className="p-5 mb-4 bg-light rounded-3">
        <Container className="py5" fluid>
          <h1 className="display-5 fw-bold">
            Welcome to the Summit Support Hub
          </h1>
          <p className="col-md-8 fs-4 mb-4">
            Passion, Honesty, Teamwork, Kindness, Learning
          </p>
          <Link
            className="btn btn-primary btn-lg"
            to="/create-submission"
            role="button"
          >
            Go to Submission Form
          </Link>
        </Container>
      </div>
    </Container>
  );
}

export default Home;
