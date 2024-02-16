import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context";
import { Container } from "react-bootstrap";
//import "src/styles/Admin.css"; // Import your custom styling

function Admin() {
  const { getAuthToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
    };

    console.log("useEffect called");

    fetch("https://localhost:7136/submissions", options)
      .then((response) => response.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <></>;
  }

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
      <div className="content-container">
        <h2 className="banner-header">This is the admin page!</h2>
        <p className="slogan-header">
          Passion, Honesty, Teamwork, Kindness, Learning
        </p>

        <div className="form-container">
          {submissions.map((submission) => (
            <Link
              key={submission.id}
              to={`/form-details/${submission.id}`}
              className="form-link"
            >
              <div className="form-box">
                <h3>{submission.topic}</h3>
                <p>Date: {submission.creationDate}</p>
                <p>Time: {submission.creationDate}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
