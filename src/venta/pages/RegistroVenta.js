import Menu from "../../Shared/components/Menu";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const GestionVenta = ({ isLoggedIn, login }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={1}>
            <Menu isLoggedIn={isLoggedIn} login={login} />
          </Col>
          <Col xs={9}>
            <div>
              <h2>Registro Venta</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionVenta;