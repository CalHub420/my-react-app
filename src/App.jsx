import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {} from "@azure/msal-react";
import { AuthProvider } from "./context";
import { PageLayout } from "./components";
import { Admin, Home, SubmissionForm, Login } from "./pages";

import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <AuthenticatedTemplate>
        <Router>
          <PageLayout>
            <Routes name="app" path="/">
              <Route exact path="/" element={<Home />} />
              <Route path="/submission-form" element={<SubmissionForm />} />
              <Route path="/admin-view" element={<Admin />} />
            </Routes>
          </PageLayout>
        </Router>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Login />
      </UnauthenticatedTemplate>
    </AuthProvider>
  );
}

export default App;
