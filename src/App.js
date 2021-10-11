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
import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

function App() {
  const [logged, setLogged] = useState(false);

  return (
    <div className="App">
      <br></br>

      <Router>
        <Switch>
          <Route path="/" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <ContentLogin isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/home" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <ContentHome isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/registroProducto" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <RegistroProducto isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/gestionProducto" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <GestionProducto isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/registroVenta" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <RegistroVenta isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/gestionVenta" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <GestionVenta isLoggedIn={logged} login={setLogged} />
          </Route>

          <Route path="/gestionUsuario" exact>
            <Header isLoggedIn={logged} login={setLogged} />
            <GestionUsuario isLoggedIn={logged} login={setLogged} />
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
