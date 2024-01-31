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
      clientId: "0239b525-8be1-49eb-9ed0-e320acbbfd10"
  }
};

const pca = new PublicClientApplication(configuration);

//<MsalProvider instance={pca}>

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
