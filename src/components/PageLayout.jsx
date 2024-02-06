import { AuthenticatedTemplate } from "@azure/msal-react";
import NavigationBar from "src/pages/NavigationBar";
import Home from "src/pages/Home";

function PageLayout(props) {
  return (
    <>
      <NavigationBar />
      <div className="header">
        <div className="logo-container">
          <img className="logo-image" src="/logo0.png" alt="Logo" />
        </div>
      </div>
      {props.children}
    </>
  );
}

export default PageLayout;
