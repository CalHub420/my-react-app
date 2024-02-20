// NavigationBar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Image, Button } from "react-bootstrap";
import { loginRequest } from "../authConfig";
import { AuthContext } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faWrench,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
//import "src/styles/NavigationBar.css"; // Import the CSS file

function NavigationBar() {
  const { handleLogout, getAuthToken, activeAccount } = useContext(AuthContext);
  const location = useLocation();

  return (
    <>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ width: 240 }}
      >
        {/* <a className="navbar-brand" href="/">
          Microsoft identity platform
        </a> */}

        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <Image fluid className="logo-image" src="/logo0.png" alt="Logo" />
        </div>

        <h5 className="mt-2 mb-0">Support Hub</h5>

        <hr />

        <Nav className="flex-column mb-auto" variant="pills">
          <Nav.Item>
            <Nav.Link
              className="text-white"
              active={location.pathname == "/"}
              icon={faHome}
              as={Link}
              to="/"
            >
              <FontAwesomeIcon icon={faHome} className="bi pe-none me-2" />
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="text-white"
              active={location.pathname == "/create-submission"}
              as={Link}
              to="/create-submission"
            >
              <FontAwesomeIcon
                icon={faClipboardList}
                className="bi pe-none me-2"
              />
              Submission
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              className="text-white"
              active={location.pathname == "/admin"}
              as={Link}
              to="/admin"
            >
              <FontAwesomeIcon icon={faWrench} className="bi pe-none me-2" />
              Admin
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className="text-white" as="button" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOut} className="bi pe-none me-2" />
              Sign out
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <hr />

        <p className="mb-5">
          <span className="text-white">
            {activeAccount && activeAccount.username
              ? activeAccount.name
              : "Unknown"}
          </span>
          <br />
          <small className="text-dark-emphasis">v0.0.1</small>
        </p>

        {/* 
        <div className="collapse navbar-collapse justify-content-end">
          <button as="button" onClick={handleLogout}>
            Sign out
          </button>
          <button
            as="button"
            onClick={() => {
              getAuthToken().then((token) => {
                console.log(token);
              });
            }}
          >
            Token
          </button>
        </div> */}
      </div>
    </>
  );
}

export default NavigationBar;
