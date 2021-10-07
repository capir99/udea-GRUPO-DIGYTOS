
import Button from 'react-bootstrap/Button';
import logo from '../../logo.png';
import gmail from '../../img/gmail.png';


const Content = () => {
  const auth = () => {
    alert("En construcción: AUTENTICADO");
    setTimeout(function () {
      window.location.href = "/home";
    }, 1000);
  };

  return (
    <div>
      <div className="d-flex justify-content-center mt-5">
        <Button type="button" className="btn btn-primary" onClick={auth}>
          <img className="mb-1" src={gmail} alt="" width="50" height="50" />
          Iniciar sesi&oacute;n con Gmail
        </Button>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <img className="mb-4" src={logo} alt="" width="300" height="100" />
      </div>
    </div>
  );
};

export default Content;
