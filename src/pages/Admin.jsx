import React from "react";
import { Link } from "react-router-dom";
import "src/styles/Admin.css"; // Import your custom styling

function Admin() {
  // Dummy data for forms
  const formList = [
    { type: "Mental Health", date: "2024-02-15", time: "14:30" },
    { type: "Mental Health", date: "2023-12-25", time: "14:30" },
    { type: "Mental Health", date: "2023-12-25", time: "13:30" },
    { type: "Grievance", date: "2024-02-16", time: "10:45" },
    { type: "Discipline Queries", date: "2024-02-17", time: "13:15" },
    { type: "Policy Question", date: "2024-02-18", time: "16:00" },
    { type: "Other", date: "2024-02-19", time: "11:20" },
  ];

  // Separate Mental Health forms and other forms
  const mentalHealthForms = formList
    .filter((form) => form.type === "Mental Health")
    .sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison === 0) {
        return (
          new Date(`1970-01-01 ${a.time}`) - new Date(`1970-01-01 ${b.time}`)
        );
      }
      return dateComparison;
    });

  const otherForms = formList
    .filter((form) => form.type !== "Mental Health")
    .sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison === 0) {
        return (
          new Date(`1970-01-01 ${a.time}`) - new Date(`1970-01-01 ${b.time}`)
        );
      }
      return dateComparison;
    });

  const sortedFormList = [...mentalHealthForms, ...otherForms];

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

        <div className="form-container">
          {sortedFormList.map((form, index) => (
            <Link
              key={index}
              to={`/form-details/${index}`}
              className="form-link"
            >
              <div className="form-box">
                <h3>{form.type}</h3>
                <p>Date: {form.date}</p>
                <p>Time: {form.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
