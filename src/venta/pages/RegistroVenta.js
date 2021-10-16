import Menu from "../../shared/components/Menu";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RegistroVenta = () => {
  const history = useHistory();
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    code: "",
    docIdent: "",
    nameClient: "",
    nameEmploye: "",
    value: "",
    quantity: "",
  });

  const handleChange = (event) => {
    setVenta({ ...venta, [event.target.name]: event.target.value });
  };

  //Función para registrar venta
  const ventaRegistrar = () => {
    async function fetchData() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venta),
      };
      if (venta) {
        await fetch("http://localhost:3002/api/ventas/add/", config);
        history.push("/gestionVenta");
      }
    }
    fetchData();
  };

  //Función para consultar todos los productos
  const consultarProductos = () => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        "http://localhost:3002/api/productos/list",
        config
      );
      const data = await response.json();
      if (data) {
        setProductos(data);
      }
    }
    fetchData();
  };
  consultarProductos();

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
              <h2>Registrar Venta</h2>
            </div>

            <div>
              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Fecha venta
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      column
                      sm="4"
                      type="text"
                      placeholder={new Date().toLocaleString()}
                      readOnly
                    />
                  </Col>

                  <Form.Label column sm="2">
                    Estado
                  </Form.Label>
                  <Col sm="4">
                    <Form.Control
                      column
                      sm="4"
                      type="text"
                      placeholder="En proceso"
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Código
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    onChange={handleChange}
                    placeholder="Código de la venta"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Documento de identidad Cliente
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="docIdent"
                    onChange={handleChange}
                    placeholder="Documento de identidad del cliente"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Cliente
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nameClient"
                    onChange={handleChange}
                    placeholder="Nombre del cliente"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="d-flex justify-content-start">
                    Vendedor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nameEmploye"
                    onChange={handleChange}
                    placeholder="Nombre del vendedor"
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
                    placeholder="Cantidad"
                  />
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2" className="text-success">
                    Seleccione el producto
                  </Form.Label>
                  <Col sm="8">
                    <Form.Select
                      size="lg"
                      name="productoSel"
                      onChange={handleChange}
                    >
                      {" "}
                      <option></option>
                      {productos.map((producto, index) => {
                        return <option>{producto.name}</option>;
                      })}
                    </Form.Select>
                  </Col>
                  <Col sm="2">
                    <Button variant="warning" onClick={ventaRegistrar}>
                      Agregar
                    </Button>
                  </Col>
                </Form.Group>

                <Button variant="primary" onClick={ventaRegistrar}>
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

export default RegistroVenta;
