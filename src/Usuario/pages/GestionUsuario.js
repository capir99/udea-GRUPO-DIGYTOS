import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import editar from "../../Shared/assets//edit.svg";
import borrar from "../../Shared/assets//delete.svg";

const GestionUsuario = () => {
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
  const handleRolChange = (e) => {
    usuarioSel.rol = e.target.value;
  };

  const handleEstadoChange = (e) => {
    usuarioSel.estado = e.target.value;
  };

  //Función para consultar todos los usuarios
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
          "https://digytosback.herokuapp.com/api/users/list",
          config
        );
        const data = await response.json();
        if (data) {
          setUsuarios(data);
        }
      }
    }
    fetchData();
  });

  //Función para consultar el usuario a partir de su id seleccionado desde la tabla
  const usuarioSeleccion = (e) => {
    async function fetchData() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/users/" + e.target.id
      );
      const data = await response.json();
      setusuarioSel(data);
    }
    fetchData();
    handleShow();
  };

  //Función para eliminar un usuario seleccionado desde la tabla
  const usuarioEliminar = (e) => {
    async function fetchData() {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/users/remove/" + e.target.id,
        config
      );
      await response.json();
    }
    fetchData();
  };

  //Función para consultar el usuario a partir de su Email seleccionado desde el campo de entrada superior
  const usuarioEmailSeleccion = (e) => {
    setFiltro(e.target.value);
    async function fetchData() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/users/search/" + e.target.value
      );
      const datos = await response.json();
      if (datos !== "Usuario no encontrado") {
        setUsuarios(datos);
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
      await fetch(
        "https://digytosback.herokuapp.com/api/users/modify/" + id,
        config
      );
    }
    fetchData();
    handleClose();
  };

  const alertaEstado = (estado) => {
    if (estado) {
      switch (estado) {
        case "Pendiente":
          return "bg-warning text-dark";
        case "Autorizado":
          return "bg-success text-white";
        case "No autorizado":
          return "bg-danger text-white";
        default:
          break;
      }
    }

    return "bg-warning text-dark";
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
              <h2>Gestión de Usuarios</h2>
              <Container>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Email de usuario"
                      onChange={usuarioEmailSeleccion}
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
                          <th scope="col">Nombre</th>
                          <th scope="col">Email</th>
                          <th scope="col">Rol</th>
                          <th scope="col">Estado</th>
                          <th scope="col">Acción</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((usuario, index) => {
                          return (
                            <tr key={index + 1}>
                              <th scope="row">{index + 1}</th>
                              <td>{usuario.login}</td>
                              <td>{usuario.fullName}</td>
                              <td>{usuario.email}</td>
                              <td>{usuario.rol}</td>
                              <td className={alertaEstado(usuario.estado)}>
                                {usuario.estado}
                              </td>
                              <td>
                                <table className="table col-5 col-s-12">
                                  <thead></thead>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <Button
                                          id={usuario._id}
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={usuarioSeleccion}
                                        >
                                          <Image
                                            src={editar}
                                            rounded
                                            id={usuario._id}
                                          />
                                        </Button>
                                      </td>

                                      <td>
                                        <Button
                                          type="button"
                                          className="btn btn-primary"
                                          onClick={usuarioEliminar}
                                        >
                                          <Image
                                            src={borrar}
                                            rounded
                                            id={usuario._id}
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
          <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Código</Form.Label>
              <Form.Control type="text" placeholder={usuarioSel._id} readOnly />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder={usuarioSel.fullName}
                readOnly
              />
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
