// NavigationBar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest, b2cPolicies } from "../authConfig";
import "src/styles/NavigationBar.css"; // Import the CSS file
import { Home } from "./Hello";
import SubmissionForm from "./SubmissionForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faClipboardList,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

function NavigationBar() {
  const { instance, inProgress } = useMsal(); // re-isntalled @azure/msal-react and it got rid of the useMsal hook issue - Doesnt seem to have fixed anything! :)
  let activeAccount;

  if (instance) {
    instance.initialize().then(() => {
      instance
        .handleRedirectPromise()
        .then((response) => {
          if (response !== null) {
            instance.setActiveAccount(response.account);
          } else {
            // need to call getAccount here?
            const currentAccounts = instance.getAllAccounts();
            if (!currentAccounts || currentAccounts.length < 1) {
              return;
            } else {
              instance.setActiveAccount(currentAccounts[0]);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    });
    activeAccount = instance.getActiveAccount();
  }

  const handleLoginPopup = () => {
    instance
      .loginPopup({
        ...loginRequest,
        redirectUri: "/",
      })
      .then((response) => {
        // After a successful login set the active account to be the user that just logged in
        instance.setActiveAccount(response.account);
      })
      .catch((error) => console.log(error));
  };

  const handleLoginRedirect = () => {
    instance
      .loginRedirect(loginRequest)
      .then((response) => {
        // After a successful login set the active account to be the user that just logged in
        instance.setActiveAccount(response.account);
      })
      .catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
  };

  const handleLogoutPopup = () => {
    instance.logoutPopup({
      mainWindowRedirectUri: "/", // redirects the top level app after logout
    });
  };

  const handleProfileEdit = () => {
    if (inProgress === InteractionStatus.None) {
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" className="navbarStyle">
        <a className="navbar-brand" href="/">
          Microsoft identity platform
        </a>

        <Nav className="flex-column">
          <Navbar.Brand as={Link} to="/home">
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

        <AuthenticatedTemplate>
          <p>
            {activeAccount && activeAccount.username
              ? activeAccount.name
              : "Unknown"}
          </p>
          <div className="collapse navbar-collapse justify-content-end">
            <button as="button" onClick={handleLogoutRedirect}>
              Sign out
            </button>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <button as="button" onClick={handleLoginRedirect}>
              Sign in
            </button>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
}

export default NavigationBar;
