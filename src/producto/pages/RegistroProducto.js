import Menu from "../../shared/components/Menu";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RegistroProducto = () => {
  const history = useHistory();
  const [producto, setProducto] = useState({
    code: "",
    name: "",
    desc: "",
    value: "",
    quantity: "",
  });

  const handleChange = (event) => {
    setProducto({ ...producto, [event.target.name]: event.target.value });
  };

  //Función para registtrar producto
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
        await fetch("http://localhost:3002/api/productos/add/", config);
        history.push("/gestionProducto");
      }
    }
    fetchData();
  };

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
                    name="code"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Nombre
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Descripción
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="desc"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Valor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="value"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Existencias
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button variant="primary" onClick={productoRegistrar}>
                  Registrar
                </Button>
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
