import Menu from "../../shared/components/Menu";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const RegistroProducto = () => {
  //Constante para el direccionamiento de página
  const history = useHistory();

  //Hook para contener el producto a registrar
  const [producto, setProducto] = useState({
    code: "",
    name: "",
    desc: "",
    value: "",
    quantity: "",
  });

  //Preparando el consecutivo del nuevo producto a partir de la fecha hora y minuto
  if (producto.code === "") {
    var dia = new Date();
    producto.code =
      "P" +
      dia.toLocaleDateString().replaceAll("/", ".") +
      "." +
      dia.getHours() +
      dia.getMinutes();
  }

  //Función para registrar cambio en los campos del formulario
  const handleChange = (event) => {
    setProducto({ ...producto, [event.target.name]: event.target.value });
  };

  //Función para efectuar el registro del nuevo producto
  const productoRegistrar = () => {
    async function fetchData() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      };
      if (producto) {
<<<<<<< HEAD
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/products/add/",
          config
        );
        const data = await response.json();
        if (data) {
          popupExitoso("Registro exitoso");
          history.push("/gestionProducto");
        }
=======
        await fetch("https://udeagrupodigytos.herokuapp.com/api/productos/add/", config);
        history.push("/gestionProducto");
>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e
      }
    }
    validarCamposRequeridos();
    if (validado) {
      fetchData();
    }
  };

  //Funciones para generar popup confirmación de exito o falla de operación
  const popupExitoso = (msg) => {
    Swal.fire({
      title: "Operación Exitosa",
      text: msg,
      type: "success",
    });
  };

  const popupFallido = (msg) => {
    Swal.fire({
      title: "Operación fallida",
      text: msg,
      type: "warning",
    });
  };

  //Función para validar los campos obligatorios del formulario
  var validado = false;
  const validarCamposRequeridos = () => {
    validado = true;
    if (producto.name === "") {
      popupFallido("El nombre de producto es requerido");
      validado = false;
    }
    if (producto.value === "") {
      popupFallido("El valor de producto es requerido");
      validado = false;
    }
    if (producto.quantity === "") {
      popupFallido(
        "La cantidad de existencias del producto es un campo requerido"
      );
      validado = false;
    }
  };

  //**********************************************************************************/
  // Return de componente a renderizar
  return (
    <div>
      <Container>
        <Row>
          <Col xs={3}>
            <Menu />
          </Col>
          <Col xs={8}>
            <div>
              <h2>Registrar Producto</h2>
            </div>

            <div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Código
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={producto.code}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    name="name"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Descripción
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Ingrese la descripción del producto"
                    rows={3}
                    name="desc"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Valor unitario (pesos $ COP)
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Ingrese el valor unitario"
                    name="value"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Existencias
                  </Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder="Ingrese la cantidad de existencias disponibles en stock"
                    name="quantity"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Button variant="primary" onClick={productoRegistrar}>
                    Registrar
                  </Button>
                </Form.Group>
              </Form>

              <Row>
                <Col xs={1}></Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegistroProducto;
