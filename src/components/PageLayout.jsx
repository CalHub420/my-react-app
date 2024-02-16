import NavigationBar from "src/pages/NavigationBar";
import { Container } from "react-bootstrap";

function PageLayout(props) {
  return (
    <main className="d-flex flex-nowrap">
      <NavigationBar />
      {/* <div className="header">
        <div className="logo-container">
          <img className="logo-image" src="/logo0.png" alt="Logo" />
        </div>
      </div> */}
      <Container className="layout-container py-4" fluid>
        {props.children}
      </Container>
    </main>
  );
}

export default PageLayout;
