import Header from '../../shared/Header';
import Nav from 'react-bootstrap/Nav'
import home from '../../menu/assets/home.svg';
import car from '../../menu/assets/car.svg';
import bag from '../../menu/assets/bag.svg';
import users from '../../menu/assets/users.svg';
import phone from '../../menu/assets/phone.svg';
import Image from 'react-bootstrap/Image'

const Home = () =>{
    return(
        <div>
            <Header />
            <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Item>
                <Nav.Link href="/home">
                        <div className="list__button">
                            <Image src={home} rounded />Inicio
                        </div>

                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/car">
                        <div className="list__button">
                        <Image src={car} rounded />Ventas
                        </div>

                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/venta">
                        <div className="list__button">
                            <Image src={bag} rounded />Vendedores
                        </div>

                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/usuario">
                        <div className="list__button">
                            <Image src={users} rounded />Usuarios/Roles
                        </div>

                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/">
                        <div className="list__button">
                            <Image src={phone} rounded />Autenticación
                        </div>

                </Nav.Link>
            </Nav.Item>

            </Nav>


        </div>
    )
};

export default Home;