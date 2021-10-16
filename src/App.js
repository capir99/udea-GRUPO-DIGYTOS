import "./css/App.css";
import "./css/estilos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Shared/components/Header";
import ContentLogin from "./Shared/pages/ContentLogin";
import ContentHome from "./Shared/pages/ContentHome";
import GestionUsuario from "./Usuario/pages/GestionUsuario";
import GestionProducto from "./Producto/pages/GestionProducto";
import RegistroProducto from "./Producto/pages/RegistroProducto";
import GestionVenta from "./Venta/pages/GestionVenta";
import RegistroVenta from "./Venta/pages/RegistroVenta";
import Error from "./Shared/pages/Error";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

function App() {
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

          <Route path="/registroProducto" exact>
            <Header />
            <RegistroProducto />
          </Route>

          <Route path="/gestionProducto" exact>
            <Header />
            <GestionProducto />
          </Route>

          <Route path="/registroVenta" exact>
            <Header />
            <RegistroVenta />
          </Route>

          <Route path="/gestionVenta" exact>
            <Header />
            <GestionVenta />
          </Route>

          <Route path="/gestionUsuario" exact>
            <Header />
            <GestionUsuario />
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
