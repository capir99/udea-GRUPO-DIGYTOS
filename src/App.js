import "./css/App.css";
import "./css/estilos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./shared/components/Header";
import ContentLogin from "./shared/pages/ContentLogin";
import ContentHome from "./shared/pages/ContentHome";
import GestionUsuario from "./Usuario/pages/GestionUsuario";
<<<<<<< HEAD
import GestionProducto from "./Producto/pages/GestionProducto";
import RegistroProducto from "./Producto/pages/RegistroProducto";
import GestionaVenta from "./Venta/pages/GestionVenta";
import RegistroVenta from "./Venta/pages/RegistroVenta";
import Error from "./Shared/pages/Error";
import SinAutorizacion from "./Shared/pages/SinAutorizacion";
=======
import GestionProducto from "./producto/pages/GestionProducto";
import RegistroProducto from "./producto/pages/RegistroProducto";
import GestionaVenta from "./venta/pages/GestionVenta";
import RegistroVenta from "./venta/pages/RegistroVenta";
import Error from "./shared/pages/Error";
import SinAutorizacion from "./shared/pages/SinAutorizacion";

>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
require('dotenv').config()


function App() {
  console.log("Entre");
  const rol = localStorage.getItem("rol");
  const estado = localStorage.getItem("estado");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <ContentLogin />
            <Header />
          </Route>

          <Route
            path="/home"
            render={() => {
              if (estado === "Autorizado") {
                return (
                  <div>
                    <Header />
                    <ContentHome />
                  </div>
                );
              } else {
                return <Redirect to="/SinAutorizacion" />;
              }
            }}
          />

          <Route
            exact
            path="/registroProducto"
            render={() => {
              if (rol === "Administrador" && estado === "Autorizado") {
                return (
                  <div>
                    <Header />
                    <RegistroProducto />
                  </div>
                );
              } else {
                return <Redirect to="/SinAutorizacion" />;
              }
            }}
          />

          <Route
            exact
            path="/gestionProducto"
            render={() => {
              if (rol === "Administrador" && estado === "Autorizado") {
                return (
                  <div>
                    <Header />
                    <GestionProducto />
                  </div>
                );
              } else {
                return <Redirect to="/SinAutorizacion" />;
              }
            }}
          />

          <Route
            exact
            path="/registroVenta"
            render={() => {
              if (estado === "Autorizado") {
                return (
                  <div>
                    <Header />
                    <RegistroVenta />
                  </div>
                );
              } else {
                return <Redirect to="/SinAutorizacion" />;
              }
            }}
          />

          <Route
            exact
            path="/gestionVenta"
            render={() => {
              if (estado === "Autorizado") {
                return (
                  <div>
                    <Header />
                    <GestionaVenta />
                  </div>
                );
              } else {
                return <Redirect to="/SinAutorizacion" />;
              }
            }}
          />


          <Route
            exact
            path="/gestionUsuario"
            render={() =>
              rol === "Administrador" ? (
                <div>
                  <Header />
                  <GestionUsuario />
                </div>
              ) : (
                <Redirect to="/SinAutorizacion" />
              )
            }
          />

          <Route path="/SinAutorizacion" exact>
            <SinAutorizacion />
          </Route>

          <Route path="/SinAutorizacion" exact>
            <SinAutorizacion />
          </Route>

          <Route path="/error" exact>
            <Error />
          </Route>
          <Redirect to="/error" />
        </Switch>
      </Router>
    </div>
  );
}

console.log(localStorage.getItem("rol")); 
export default App;
