import React from "react";
import { Link } from "react-router-dom";
import "src/styles/Admin.css"; // Import your custom styling

function Admin() {
  return (
    <div className="admin">
      <div className="header">
        <div className="logo-container">
          {/* Use the logo from the public folder */}
          <img className="logo-image" src="/logo0.png" alt="Logo" />
        </div>
      </div>
      <div className="content-container">
        <h2 className="banner-header">This is the admin page</h2>
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

export default Admin;
