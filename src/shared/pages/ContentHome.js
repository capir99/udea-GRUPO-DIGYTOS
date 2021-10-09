import Menu from "../components/Menu";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import logo from "../../logo.png";


const ContentHome = ({ isLoggedIn, login }) => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={1}>
            <Menu isLoggedIn={isLoggedIn} login={login} />
          </Col>
          <Col xs={1}/>
          <Col xs={9}>
            <div className="d-flex justify-content-center mt-5">
              <img
                className="ml-5 mt-5"
                src={logo}
                alt=""
                width="300"
                height="100"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContentHome;
