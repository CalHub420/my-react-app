import { AuthenticatedTemplate } from "@azure/msal-react";
import NavigationBar  from "src/pages/NavigationBar";
import Home from "src/pages/Home";

function PageLayout(props) {
    return (
        <>
        <NavigationBar />
            {props.children}
            
        </>
    );
};

export default PageLayout;