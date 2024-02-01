import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from 'react-dom/client';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from "@azure/msal-browser";

const root = createRoot(document.getElementById('root'));

const configuration = {
  auth: {
      clientId: "0239b525-8be1-49eb-9ed0-e320acbbfd10",
      authority: 'https://login.microsoftonline.com/8634d27a-013f-4953-b957-60fdb603213d'
  }
};

const pca = new PublicClientApplication(configuration);

root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

reportWebVitals();
