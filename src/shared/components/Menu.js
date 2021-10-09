import Nav from "react-bootstrap/Nav";
import home from "../assets/home.svg";
import car from "../assets//car.svg";
import card from "../assets//card.svg";
import bag from "../assets//bag.svg";
import list from "../assets//list.svg";
import users from "../assets//users.svg";
import Image from "react-bootstrap/Image";

const Menu = ({ isLoggedIn, login }) => {
  login(true);
  return (
    <div>
      <Nav defaultActiveKey="/home" className="flex-column">
        <Nav.Item>
          <Nav.Link href="/home">
            <div className="list__button m-1">
              <Image src={home} rounded />
              Inicio
            </div>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/registroProducto">
            <div className="list__button m-1">
              <Image src={bag} rounded />
              Registrar Producto
            </div>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/gestionProducto">
            <div className="list__button m-1">
              <Image src={list} rounded />
              Gestionar Productos
            </div>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/registroVenta">
            <div className="list__button m-1">
              <Image src={car} rounded />
              Registrar Venta
            </div>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/gestionVenta">
            <div className="list__button m-1">
              <Image src={card} rounded />
              Gestionar Ventas
            </div>
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link href="/gestionUsuario">
            <div className="list__button m-1">
              <Image src={users} rounded />
              Usuarios/Roles
            </div>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Menu;
