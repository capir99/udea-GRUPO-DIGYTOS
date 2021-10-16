import { useHistory } from "react-router-dom";
import restringido from "../assets//restringido.svg";
import Button from "react-bootstrap/Button";

const SinAutorizacion = () => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-center mt-5">
      <img className="mb-4" src={restringido} alt="" width="300" height="100" />
      <div>
        <h1>Sin autorización</h1>
        <h3>Por favor contactar al adminsitrador para validar su usuario</h3>
        <span className="tag">soportedigytos@udea.com</span>
        <br />
        <br />
        <div>
          <Button
            variant="primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Regresar al sitio
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SinAutorizacion;
