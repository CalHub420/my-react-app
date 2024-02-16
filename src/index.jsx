import React from "react";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import "./index.css";

const root = createRoot(document.getElementById("root"));

const configuration = {
  auth: {
    clientId: "4e369d06-1ed9-413d-a00d-1c6c746cc8c5",
    authority:
      "https://login.microsoftonline.com/8634d27a-013f-4953-b957-60fdb603213d/v2.0",
    redirectUri: "https://localhost:3000", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
    postLogoutRedirectUri: "https://localhost:3000", // Indicates the page to navigate after logout.
  },
};

const pca = new PublicClientApplication(configuration);

root.render(
  <MsalProvider instance={pca}>
    <App />
  </MsalProvider>
);

reportWebVitals();
