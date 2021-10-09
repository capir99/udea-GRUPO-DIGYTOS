import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import logo from "../../logo.png";
import gmail from "../../img/gmail.png";

const Content = ({isLoggedIn, login }) => {
  const enableLogin = () => {
    login(true);
    alert("En construcción: AUTENTICADO");
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <Link to="/home">
          <Button type="button" className="btn btn-primary" onClick={enableLogin}>
            <img className="mb-1" src={gmail} alt="" width="50" height="50" />
            Iniciar sesi&oacute;n con Gmail
          </Button>
        </Link>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img className="mb-4" src={logo} alt="" width="300" height="100" />
      </div>
    </div>
  );
};

export default Content;
