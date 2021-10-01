import logo from './logo.png';
import gmail from './img/gmail.png';
import './css/App.css';
import './css/estilos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

// import  { BrowserRouter as Router, Route} from "react-router-dom";
// 
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'


function App() {
  return (
    <div>

      <div className="header"><h1>SISTEMA DE GESTIÓN DE VENTAS</h1></div>

      <div className="d-flex justify-content-center mt-5">
        <Button type="button" className="btn btn-primary ">
          <img className="mb-1" src={gmail} alt="" width="50" height="50"/>Iniciar sesi&oacute;n con Gmail</Button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img className="mb-4" src={logo} alt="" width="300" height="80"/>
      </div>


    </div>
  );
}

export default App;
