import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";

const GestionUsuario = ({ isLoggedIn, login }) => {
  //hooks para actualizar lista de usuarios, usuario seleccionado y visibilidad de la pantalla modal
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSel, setusuarioSel] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [show, setShow] = useState(false);

  // funciones visibilidad de la pantalla modal
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  // funciones para actualizar el valor seleccionado de las listas desplegables rol y estado
  const handleRolChange = (event) => {
    usuarioSel.rol = event.target.value;
  };
  const handleEstadoChange = (event) => {
    usuarioSel.estado = event.target.value;
  };

  //Función para consultar todos los usuarios
  useEffect(() => {
    async function fetchData() {
      if (filtro.length === 0) {
        const response = await fetch("http://localhost:3002/api/usuarios/list");
        const data = await response.json();
        setUsuarios(data);
      }
    }
    fetchData();
  });

  //Función para consultar el usuario a partir de su id seleccionado desde la tabla
  const usuarioSeleccion = (e) => {
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/usuarios/" + e.target.id
      );
      const data = await response.json();
      setusuarioSel(data);
    }
    fetchData();
    handleShow();
  };

  //Función para consultar el usuario a partir de su login seleccionado desde el campo de entrada superior
  const usuarioLoginSeleccion = (e) => {
    setFiltro(e.target.value);
    async function fetchData() {
      const response = await fetch(
        "http://localhost:3002/api/usuarios/search/" + e.target.value
      );
      const datos = await response.json();
      console.log(datos);
      if (datos !== "Usuario no encontrado") {
        setUsuarios(datos);
        console.log(usuarios);
      } else {
        setUsuarios([]);
      }
    }
    if (e.target.value) {
      fetchData();
    }
  };

  //Función para actualizar usuario editado a partir de la pantalla modal
  const usuarioActualizar = (id) => {
    async function fetchData() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(usuarioSel),
      };
      await fetch("http://localhost:3002/api/usuarios/modify/" + id, config);
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
            <Menu isLoggedIn={isLoggedIn} login={login} />
          </Col>
          <Col xs={8}>
            <div className="row justify-content-center">
              <h2>Gestión de Usuarios</h2>
              <Container>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Login de usuario"
                      onChange={usuarioLoginSeleccion}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <table
                      id="tbUsuario"
                      className="table table-striped col-5 col-s-12"
                    >
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">login</th>
                          <th scope="col">fullName</th>
                          <th scope="col">Rol</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario, index) => {
                          return (
                            <tr>
                              <th scope="row">{index + 1}</th>
                              <td>{usuario.login}</td>
                              <td>{usuario.fullName}</td>
                              <td>{usuario.rol}</td>
                              <td>{usuario.estado}</td>
                              <td>
                                <Button
                                  id={usuario._id}
                                  type="button"
                                  className="btn btn-primary"
                                  onClick={usuarioSeleccion}
                                >
                                  Actualizar
                                </Button>
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
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" value={usuarioSel._id} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" value={usuarioSel.fullName} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                size="lg"
                value={usuarioSel.rol}
                onChange={handleRolChange}
              >
                <option>Vendedor</option>
                <option>Administrador</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Estado</Form.Label>
              <Form.Select
                size="lg"
                value={usuarioSel.estado}
                onChange={handleEstadoChange}
              >
                <option>Pendiente</option>
                <option>Autorizado</option>
                <option>No autorizado</option>
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
            onClick={() => usuarioActualizar(usuarioSel._id)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GestionUsuario;
