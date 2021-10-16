import Menu from "../../shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import editar from "../../shared/assets//edit.svg";
import borrar from "../../shared/assets//delete.svg";

const GestionVenta = () => {
  //hooks para actualizar lista de ventas, venta seleccionada y visibilidad de la pantalla modal
  const [ventas, setVentas] = useState([]);
  const [ventaSel, setventaSel] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setventaSel({ ...ventaSel, [event.target.name]: event.target.value });
  };

  const colorAlertaEstado = (estado) => {
    if (estado === "Entregada") {
      return "bg-success text-white";
    } else if (estado === "Cancelada") {
      return "bg-danger text-white";
    } else if (estado === "En proceso") {
      return "bg-warning text-white";
    }
  };

  // funciones visibilidad de la pantalla modal
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  //Función para consultar todos las ventas
  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem("token");
      const config = {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      if (filtro.length === 0) {
        const response = await fetch(
          "http://localhost:3002/api/ventas/list",
          config
        );
        const data = await response.json();
        if (data) {
          setVentas(data);
        }
      }
    }
    fetchData();
  });

  //Función para consultar la venta a partir de su id seleccionado desde la tabla
  const ventaSeleccion = (e) => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/ventas/" + e.target.id
      );
      const data = await response.json();
      setventaSel(data);
    }
    fetchData();
    handleShow();
  };

  //Función para eliminar un producto seleccionado desde la tabla
  const ventaEliminar = (e) => {
    async function fetchData() {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(
        "http://localhost:3002/api/ventas/remove/" + e.target.id,
        config
      );
      await response.json();
    }
    fetchData();
  };

  //Función para consultar la venta a partir de su código seleccionado desde el campo de entrada superior
  const ventaCodeSeleccion = (e) => {
    setFiltro(e.target.value);
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/ventas/search/" + e.target.value
      );
      const datos = await response.json();
      if (datos !== "Venta no encontrada") {
        setVentas(datos);
      } else {
        setVentas([]);
      }
    }
    if (e.target.value) {
      fetchData();
    }
  };

  //Función para actualizar la venta editada a partir de la pantalla modal
  const productoActualizar = (id) => {
    async function fetchData() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaSel),
      };
      await fetch("http://localhost:3002/api/ventas/modify/" + id, config);
    }
    fetchData();
    handleClose();
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
            <div className="row justify-content-center">
              <h2>Gestión de Ventas</h2>
              <Container>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Codigo de la venta"
                      onChange={ventaCodeSeleccion}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <table
                      id="tbVenta"
                      className="table table-striped col-5 col-s-12"
                    >
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Código</th>
                          <th scope="col">Doc. IdentCliente</th>
                          <th scope="col">Cliente</th>
                          <th scope="col">Vendedor</th>
                          <th scope="col">Valor</th>
                          <th scope="col">Cantidad arti.</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ventas.map((venta, index) => {
                          return (
                            <tr key={index + 1}>
                              <th scope="row">{index + 1}</th>
                              <td>{venta.code}</td>
                              <td>{venta.docIdent}</td>
                              <td>{venta.nameClient}</td>
                              <td>{venta.nameEmploye}</td>
                              <td>{venta.value}</td>
                              <td>{venta.quantity}</td>
                              <td className={colorAlertaEstado(venta.estado)}>
                                {venta.estado}
                              </td>
                              <td>
                                <table className="table col-5 col-s-12">
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Button
                                          id={venta._id}
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={ventaSeleccion}
                                        >
                                          <Image
                                            src={editar}
                                            rounded
                                            id={venta._id}
                                          />
                                        </Button>
                                      </td>

                                      <td>
                                        <Button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={ventaEliminar}
                                        >
                                          <Image
                                            src={borrar}
                                            rounded
                                            id={venta._id}
                                          />
                                        </Button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </Form.Group>
                </Form>

                <Row>
                  <Col xs={1}></Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" placeholder={ventaSel.code} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex justify-content-start">
                Documento de identidad Cliente
              </Form.Label>
              <Form.Control
                type="text"
                value={ventaSel.docIdent}
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
                value={ventaSel.nameClient}
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
                value={ventaSel.nameEmploye}
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
                value={ventaSel.value}
                name="value"
                onChange={handleChange}
                placeholder="Cantidad"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex justify-content-start">
                Estado
              </Form.Label>
              <Form.Select
                size="lg"
                value={ventaSel.estado}
                name="estado"
                onChange={handleChange}
              >
                <option>En proceso</option>
                <option>Entregada</option>
                <option>Cancelada</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => productoActualizar(ventaSel._id)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionVenta;
