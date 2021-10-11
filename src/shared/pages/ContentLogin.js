import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import gmail from "../../img/gmail.png";
import GoogleLogin from "react-google-login";

const Content = ({ isLoggedIn, login }) => {
 

  const respuestaGoogle = (respuesta) => {
    if (respuesta) {
      if (!respuesta.error) {
        login(true);
        window.location.href = "/home";
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
