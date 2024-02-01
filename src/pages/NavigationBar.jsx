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
        <AuthenticatedTemplate>
          <Nav.Link className="navbarButton" href="/todolist">
            Todolist
          </Nav.Link>
          <div className="collapse navbar-collapse justify-content-end">
            <Button
              variant="info"
              onClick={handleProfileEdit}
              className="profileButton"
            >
              Edit Profile
            </Button>

            <DropdownButton
              variant="warning"
              drop="start"
              title={
                activeAccount && activeAccount.username
                  ? activeAccount.username
                  : "Unknown"
              }
            >
              <Dropdown.Item as="button" onClick={handleLogoutPopup}>
                Sign out using Popup
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLogoutRedirect}>
                Sign out using Redirect
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <div className="collapse navbar-collapse justify-content-end">
            <DropdownButton
              variant="secondary"
              className="ml-auto"
              drop="start"
              title="Sign In"
            >
              <Dropdown.Item as="button" onClick={handleLoginPopup}>
                Sign in using Popup
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleLoginRedirect}>
                Sign in using Redirect
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </UnauthenticatedTemplate>
      </Navbar>
    </>
  );
}

export default NavigationBar;
