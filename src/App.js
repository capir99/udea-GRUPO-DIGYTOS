import "./css/App.css";
import "./css/estilos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./shared/components/Header";
import ContentLogin from "./shared/pages/ContentLogin";
import ContentHome from "./shared/pages/ContentHome";
import GestionUsuario from "./Usuario/pages/GestionUsuario";
import GestionProducto from "./producto/pages/GestionProducto";
import RegistroProducto from "./producto/pages/RegistroProducto";
import GestionaVenta from "./venta/pages/GestionVenta";
import RegistroVenta from "./venta/pages/RegistroVenta";
import Error from "./shared/pages/Error";
import SinAutorizacion from "./shared/pages/SinAutorizacion";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

function App() {
  console.log("Entre");
  const rol = localStorage.getItem("rol");
  const estado = localStorage.getItem("estado");
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Header />
            <ContentLogin />
          </Route>

          <Route path="/home" exact>
            <Header />
            <ContentHome />
          </Route>

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
<Route exact path="/gestionUsuario">
<div>
            <Header />
            <GestionUsuario />
</div>
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
