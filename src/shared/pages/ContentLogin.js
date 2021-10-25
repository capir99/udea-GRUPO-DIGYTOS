import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import gmail from "../../img/gmail.png";
import GoogleLogin from "react-google-login";
import { useHistory } from "react-router-dom";
const jwt = require("jsonwebtoken");

const Content = () => {
  localStorage.removeItem("token"); //retira cualquier token de autenticación que exista

  const history = useHistory();
  const respuestaGoogle = (respuesta) => {
    if (respuesta) {
      if (!respuesta.error) {
        localStorage.setItem("token", respuesta.tokenId);

        //Función para consultar si el usuario ya existe en el sistema
        async function validarUsuario() {
          const token = localStorage.getItem("token");
          const config = {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(
            "https://udeagrupodigytos.herokuapp.com/api/usuarios/list",
            config
          );
          await response.json();
        }
        validarUsuario();

        //Identificación del rol
        if (localStorage.getItem("token")) {
          async function fetchData() {
            const response = await fetch(
              "https://udeagrupodigytos.herokuapp.com/api/usuarios/search/" + decodedToken.email
            );
            const datos = await response.json();
            if (datos[0]) {
              localStorage.setItem("rol", datos[0].rol);
              localStorage.setItem("estado", datos[0].estado);
            }
          }
          const decodedToken = jwt.decode(
            localStorage.getItem("token"),
            process.env.JWT_KEY
          );

          if (decodedToken) {
            fetchData();
          }
        }

        history.push("/home");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <GoogleLogin
          clientId="1067360347931-rmi20n77einrbt0mjn1fkdj7opcgupqb.apps.googleusercontent.com"
          // buttonText="Login"
          render={(renderProps) => (
            <Link to="/home">
              <Button
                type="button"
                className="btn btn-primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  className="mb-1"
                  src={gmail}
                  alt=""
                  width="50"
                  height="50"
                />
                Iniciar sesi&oacute;n con Gmail
              </Button>
            </Link>
          )}
          onSuccess={respuestaGoogle}
          onFailure={respuestaGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img className="mb-4" src={logo} alt="" width="300" height="100" />
      </div>
    </div>
  );
};

export default Content;
