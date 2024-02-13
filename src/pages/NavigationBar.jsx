// NavigationBar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "../authConfig";
import SubmissionForm from "./SubmissionForm";
import { AuthContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import "src/styles/NavigationBar.css"; // Import the CSS file

function NavigationBar() {
  const { handleLogout, activeAccount } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Microsoft identity platform
        </a>

        <Nav className="flex-column">
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon
              icon={faHome}
              style={{
                fontSize: "2em",
                marginBottom: "25px",
                marginTop: "25px",
                marginRight: "20px",
              }}
            />
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/submission-form">
            <FontAwesomeIcon
              icon={faClipboardList}
              style={{
                fontSize: "2em",
                marginBottom: "25px",
                marginRight: "20px",
              }}
            />
          </Navbar.Brand>

          <Navbar.Brand as={Link} to="/admin-view">
            <FontAwesomeIcon
              icon={faWrench}
              style={{
                fontSize: "2em",
                marginBottom: "25px",
                marginRight: "10px",
              }}
            />
          </Navbar.Brand>
        </Nav>

        <p>
          {activeAccount && activeAccount.username
            ? activeAccount.name
            : "Unknown"}
        </p>
        <div className="collapse navbar-collapse justify-content-end">
          <button as="button" onClick={handleLogout}>
            Sign out
          </button>
        </div>
      </Navbar>
    </>
  );
}

export default NavigationBar;
