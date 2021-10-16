import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import editar from "../../Shared/assets//edit.svg";
import borrar from "../../Shared/assets//delete.svg";

const GestionProducto = () => {
  //hooks para actualizar lista de productos, producto seleccionado y visibilidad de la pantalla modal
  const [productos, setProductos] = useState([]);
  const [productoSel, setproductoSel] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [show, setShow] = useState(false);

  const handleChange = (event) => {
    setproductoSel({ ...productoSel, [event.target.name]: event.target.value });
    console.log(productoSel);
  };

  const colorAlertaEstado = (estado) => {
    if (estado > 0) {
      return "bg-success text-white";
    } else {
      return "bg-danger text-white";
    }
  };
  const alertaEstado = (estado) => {
    if (estado > 0) {
      return "Disponible";
    } else {
      return "No disponible";
    }
  };

  // funciones visibilidad de la pantalla modal
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  //Función para consultar todos los productos
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
          "http://localhost:3002/api/productos/list",
          config
        );
        const data = await response.json();
        if (data) {
          setProductos(data);
        }
      }
    }
    fetchData();
  });

  //Función para consultar el producto a partir de su id seleccionado desde la tabla
  const productoSeleccion = (e) => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/productos/" + e.target.id
      );
      const data = await response.json();
      setproductoSel(data);
    }
    fetchData();
    handleShow();
  };

  //Función para eliminar un producto seleccionado desde la tabla
  const productoEliminar = (e) => {
    async function fetchData() {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(
        "http://localhost:3002/api/productos/remove/" + e.target.id,
        config
      );
      await response.json();
    }
    fetchData();
  };

  //Función para consultar el producto a partir de su código seleccionado desde el campo de entrada superior
  const productoCodeSeleccion = (e) => {
    setFiltro(e.target.value);
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/productos/search/" + e.target.value
      );
      const datos = await response.json();
      if (datos !== "Producto no encontrado") {
        setProductos(datos);
      } else {
        setProductos([]);
      }
    }
    if (e.target.value) {
      fetchData();
    }
  };

  //Función para actualizar producto editado a partir de la pantalla modal
  const productoActualizar = (id) => {
    async function fetchData() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productoSel),
      };
      await fetch("http://localhost:3002/api/productos/modify/" + id, config);
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
              <h2>Gestión de Productos</h2>
              <Container>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Codigo de producto"
                      onChange={productoCodeSeleccion}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <table
                      id="tbProducto"
                      className="table table-striped col-5 col-s-12"
                    >
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Código</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Existencias</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productos.map((producto, index) => {
                          return (
                            <tr key={index + 1}>
                              <th scope="row">{index + 1}</th>
                              <td>{producto.code}</td>
                              <td>{producto.name}</td>
                              <td>{producto.value}</td>
                              <td>{producto.quantity}</td>
                              <td
                                className={colorAlertaEstado(producto.quantity)}
                              >
                                {alertaEstado(producto.quantity)}
                              </td>
                              <td>
                                <table className="table col-5 col-s-12">
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Button
                                          id={producto._id}
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={productoSeleccion}
                                        >
                                          <Image
                                            src={editar}
                                            rounded
                                            id={producto._id}
                                          />
                                        </Button>
                                      </td>

                                      <td>
                                        <Button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={productoEliminar}
                                        >
                                          <Image
                                            src={borrar}
                                            rounded
                                            id={producto._id}
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
              <Form.Control
                type="text"
                placeholder={productoSel.code}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productoSel.desc}
                name="desc"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.value}
                name="value"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Existencias</Form.Label>
              <Form.Control
                type="text"
                value={productoSel.quantity}
                name="quantity"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => productoActualizar(productoSel._id)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionProducto;
