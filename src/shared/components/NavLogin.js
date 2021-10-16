import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import auth from "../assets//auth.svg";
import Nav from "react-bootstrap/Nav";

const NavLogin = () => {
  const disableLogin = () => {
    localStorage.removeItem('token');
  };
  return (
    <div className="row">
      <Nav
        variant="pills"
        defaultActiveKey="/home"
        className="justify-content-end"
      >
        <Nav.Item>
          <Button type="button" className="btn btn-light">
            <Nav.Link href="/" onClick={disableLogin}>
              <Image src={auth} rounded />
              Cerrar Sesión
            </Nav.Link>
          </Button>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default NavLogin;
