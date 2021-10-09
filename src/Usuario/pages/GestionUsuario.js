import Button from "react-bootstrap/Button";
import Menu from "../../Shared/components/Menu";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";

const GestionUsuario = ({ isLoggedIn, login }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3002/api/usuarios/list");
      const data = await response.json();
      setUsuarios(data);
    }
    fetchData();
  });

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
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Código o nombre del usuario"
                    />
                  </Form.Group>

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
                            <td>
                              <Button
                                id={usuario._id}
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                              >
                                Actualizar
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </Form>

                <Row>
                  <Col xs={1}></Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GestionUsuario;
