import NavLogin from "./NavLogin";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Header = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return (
      <div className="header">
        <Container>
          <Row>
            <Col xs={2}></Col>
            <Col xs={8}>
              <h1>SISTEMA DE GESTIÓN DE VENTAS</h1>
            </Col>
            <Col xs={2}>
              <NavLogin />
            </Col>
          </Row>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <div className="header">
          <h1>SISTEMA DE GESTIÓN DE VENTAS</h1>
        </div>
      </div>
    );
  }
};

export default Header;
