import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import {} from "@azure/msal-react";
import { AuthProvider } from "./context";
import { PageLayout } from "./components";
import {
  Admin,
  Home,
  CreateSubmission,
  SubmissionDetails,
  Login,
} from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

//import "./styles/App.css";

function App() {
  return (
    <AuthProvider>
      <AuthenticatedTemplate>
        <Router>
          <PageLayout>
            <Routes name="app" path="/">
              <Route exact path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/create-submission" element={<CreateSubmission />} />
              <Route path="/submission/:id" element={<SubmissionDetails />} />
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
