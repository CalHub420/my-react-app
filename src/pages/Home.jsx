import React from "react";
import { Link } from "react-router-dom";
import "src/styles/Home.css";

function Home() {
  return (
    <div className="home">
      <div className="content-container">
        <h2 className="banner-header1">Welcome to the Summit Support Hub</h2>
        <p className="slogan-header">
          Passion, Honesty, Teamwork, Kindness, Learning
        </p>
        <Link to="/submission-form">
          <button className="submission-button">Go to Submission Form</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
