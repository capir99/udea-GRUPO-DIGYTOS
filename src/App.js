import "./css/App.css";
import "./css/estilos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Shared/components/Header";
import ContentLogin from "./Shared/pages/ContentLogin";
import ContentHome from "./Shared/pages/ContentHome";
import GestionUsuario from "./Usuario/pages/GestionUsuario";
import GestionProducto from "./Producto/pages/GestionProducto";
import RegistroProducto from "./Producto/pages/RegistroProducto";
import GestionaVenta from "./Venta/pages/GestionVenta";
import RegistroVenta from "./Venta/pages/RegistroVenta";
import Error from "./Shared/pages/Error";
import SinAutorizacion from "./Shared/pages/SinAutorizacion";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
require('dotenv').config()


function App() {
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

          <Route path="/error" exact>
            <Error />
          </Route>
          <Redirect to="/error" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
