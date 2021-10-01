import logo from './logo.png';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/signin.css';
// import  { BrowserRouter as Router, Route} from "react-router-dom";

import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'


function App() {
  return (
    <div>
    <form className="form-signin"> 

            <img className="mb-4" src={logo} alt="" width="300" height="80"/>
            <h1 className="h3 mb-3 fw-normal">Sistema de Gestión de Ventas</h1>

            <div className="form-floating">
              <input type="text" className="form-control" id="floatingInput" placeholder="Usuario" />
              <label for="floatingInput">Usuario</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Contraseña</label>
            </div>

            
            <Button className="w-100 btn btn-lg btn-primary" type="submit">Ingresar</Button>
            <p className="mt-5 mb-3 text-muted">&copy; Grupo DIGYTOS Udea ciclo3–2021</p>

    </form>

    </div>
  );
}

export default App;
