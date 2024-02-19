import NavigationBar from "./NavigationBar";
import { Container } from "react-bootstrap";

function PageLayout(props) {
  return (
    <main className="d-flex flex-nowrap">
      <NavigationBar />
      <Container className="layout-container py-4" fluid>
        {props.children}
      </Container>
    </main>
  );
}

export default PageLayout;
