import { createContext, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const { instance } = useMsal();
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

  const handleLogin = () => {
    instance
      .loginRedirect(loginRequest)
      .then((response) => {
        // After a successful login set the active account to be the user that just logged in
        instance.setActiveAccount(response.account);
      })
      .catch((error) => console.log(error));
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  const getAuthToken = async () => {
    const currentAccount = instance.getActiveAccount();
    const accessTokenRequest = {
      scopes: ["User.Read"],
      account: currentAccount,
    };

    if (currentAccount) {
      let accessTokenResponse;

      try {
        accessTokenResponse = await instance.acquireTokenSilent(
          accessTokenRequest
        );
      } catch (error) {
        if (error) {
          // fallback to interaction when silent call fails
          accessTokenResponse = await instance.acquireTokenRedirect(
            accessTokenRequest
          );
        }
      }

      return accessTokenResponse
        ? `Bearer ${accessTokenResponse.accessToken}`
        : null;
    }
    return null;
  };

  return (
    <Provider
      value={{ handleLogin, handleLogout, getAuthToken, activeAccount }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
