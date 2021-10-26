<<<<<<< HEAD
import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
=======
import Menu from "../../shared/components/Menu";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Image from "react-bootstrap/Image";
import borrar from "../../Shared/assets//delete.svg";
import Swal from "sweetalert2";

const RegistroVenta = () => {
  //Constante para el direccionamiento de página
  const history = useHistory();

  //Hook para contener la venta a registrar y sus productos asociados
  const [venta, setVenta] = useState({
    code: "",
    docIdent: "",
    nameClient: "",
    nameEmploye: "",
    value: "",
    quantity: "",
  });

  //Hook para contener los productos asociados a la venta
  const [listaproductosVenta, setListaproductosVenta] = useState([]);

  //Hooks para contener la lista de productos existentes, vendedores, producto seleccionado
  //y cantidad por producto vendida
  const [listaproductos, setListaproductos] = useState([]);
  const [listavendedores, setListavendedores] = useState([]);
  const [productoSel, setProductoSel] = useState([]);
  const [cantidadRequerida, setCantidadRequerida] = useState(1);

  //Contantes para establecer el formato de dinero pesos COP
  const options2 = { style: "currency", currency: "COP" };
  const moneyFormat = new Intl.NumberFormat("es-CO", options2);

  //Función para registrar cambio en los campos del formulario
  const handleChange = (event) => {
    setVenta({ ...venta, [event.target.name]: event.target.value });
  };

  //Función para recuperar id del producto seleccionado
  const [disponible, setDisponible] = useState(0);
  const handleChangeProducto = (event) => {
    const index = event.target.selectedIndex;
    const optionElement = event.target.childNodes[index];
    const optionElementId = optionElement.getAttribute("id");
    setProductoSel(optionElementId);

    async function consultarExistencias() {
      if (optionElementId) {
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/products/" + optionElementId
        );
        const data = await response.json();
        if (data) {
          setDisponible(data.quantity);
        }
      }
    }
    consultarExistencias();
  };

  //Preparando el consecutivo de la nueva venta a partir de la fecha hora y minuto
  if (venta.code === "") {
    var dia = new Date();
    venta.code =
      "V" +
      dia.toLocaleDateString().replaceAll("/", ".") +
      "." +
      dia.getHours() +
      dia.getMinutes();
  }

  //Función para registrar cambio en el campo cantidad de producto requerida
  const handleChangeCantidad = (event) => {
    setCantidadRequerida(event.target.value);
  };

  //Hooks y funciones para controlar visibilidad de la pantalla modal que permite asociar un producto
  //a la venta
  const [show, setShow] = useState(false);
  const handleShow = () => {
    consultarProductos();
    consultarVendedores();
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setDisponible(0);
  };

  //Función para totalizar la cantidad de items y el valor de la venta  a partir de los productos asociados
  const totalizar = () => {
    venta.value = listaproductosVenta.reduce(
      (prev, next) => prev + next.value * next.quantitySale,
      0
    );
    venta.quantity = listaproductosVenta.reduce(
      (prev2, next2) => parseInt(prev2) + parseInt(next2.quantitySale),
      0
    );
  };

  //Función para agregar un producto a la venta
  const agregarProductoVenta = () => {
    if (cantidadRequerida <= disponible) {
      async function fetchData() {
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/products/" + productoSel
        );
        const data = await response.json();
        if (data) {
          data["quantitySale"] = cantidadRequerida;
          setListaproductosVenta([...listaproductosVenta, data]);
          setCantidadRequerida(1);
        }
      }
      fetchData();
      handleClose();
    } else {
      popupFallido(
        "La cantidad seleccionada no puede superar el disponible del producto en stock"
      );
    }
  };

  //Función para eliminar un producto de la venta
  const productoVentaEliminar = (e) => {
    var index = listaproductosVenta
      .map((x) => {
        return x._id;
      })
      .indexOf(e.target.id);
    listaproductosVenta.splice(index, 1);
  };

  //Función para registrar la venta en la base de datos con su relación de productos y disminición del Stock
  const ventaRegistrar = () => {
    async function registrarVenta() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(venta),
      };
      if (venta) {
<<<<<<< HEAD
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/sales/add/",
          config
        );
        const idVenta = await response.json();
        if (idVenta) {
          registraproductos(idVenta);
        }
=======
        await fetch("https://udeagrupodigytos.herokuapp.com/api/ventas/add/", config);
        history.push("/gestionVenta");
>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e
      }
    }

    async function registraproductos(idVenta) {
      listaproductosVenta.map(async (x) => {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sale: idVenta,
            product: x._id,
            value: parseInt(x.value),
            quantitySale: parseInt(x.quantitySale),
          }),
        };
        if (venta) {
          await fetch("https://digytosback.herokuapp.com/api/saleProduct/add/", config);
          disminuirStockProducto(x, x.quantitySale);
        }
      });

      popupExitoso("Registro exitoso");
      history.push("/gestionVenta");
    }

    async function disminuirStockProducto(Prod, cant) {
      Prod.quantity -= cant;
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Prod),
      };
      const response = await fetch(
<<<<<<< HEAD
        "https://digytosback.herokuapp.com/api/products/modify/" + Prod._id,
=======
        "https://udeagrupodigytos.herokuapp.com/api/productos/list",
>>>>>>> 616c8517b17235fb92c4c266581a892d86f5999e
        config
      );
      await response.json();
    }

    validarCamposRequeridos();
    if (validado) {
      registrarVenta();
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
    if (venta.nameEmploye === "") {
      popupFallido("El nombre del vendedor es requerido");
      validado = false;
    }
    if (venta.nameClient === "") {
      popupFallido("El nombre del cliente es requerido");
      validado = false;
    }
    if (venta.docIdent === "") {
      popupFallido("El documento de identificación del cliente es requerido");
      validado = false;
    }
    if (listaproductosVenta.length === 0) {
      popupFallido(
        "Para registrar una venta debe asociar al menos un producto"
      );
      validado = false;
    }
  };

  //Función para consultar todos los productos en stock
  const consultarProductos = () => {
    async function fetchData() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/products/listStock"
      );
      const data = await response.json();
      if (data) {
        setListaproductos(data);
      }
    }
    fetchData();
  };

  //Función para consultar todos los vendedores registrados
  const consultarVendedores = () => {
    async function fetchData() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/users/sellerList"
      );
      const data = await response.json();
      if (data) {
        setListavendedores(data);
      }
    }
    fetchData();
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
                      type="text"
                      placeholder={new Date().toLocaleDateString()}
                      readOnly
                    />
                  </Col>
                  <Col sm="2">
                    <Form.Label>Estado</Form.Label>
                  </Col>
                  <Col sm="4">
                    <Form.Control
                      type="text"
                      placeholder="En proceso"
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm="2">
                    <Form.Label>Código venta</Form.Label>
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      placeholder={venta.code}
                      readOnly
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm="2">
                    <Form.Label>Identificación cliente</Form.Label>
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="Number"
                      name="docIdent"
                      onChange={handleChange}
                      placeholder="Documento de identidad del cliente"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm="2">
                    <Form.Label>Nombre cliente</Form.Label>
                  </Col>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      name="nameClient"
                      onChange={handleChange}
                      placeholder="Nombre del cliente"
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Col sm="2">
                    <Form.Label column sm="2">
                      Vendedor
                    </Form.Label>
                  </Col>
                  <Col sm="6">
                    <Form.Select
                      size="lg"
                      name="nameEmploye"
                      onChange={handleChange}
                    >
                      <option></option>
                      {listavendedores.map((vendedor, index) => {
                        return (
                          <option key={index} id={vendedor._id}>
                            {vendedor.fullName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm="2">
                    Valor neto venta
                  </Form.Label>
                  <Col sm="6">
                    <Form.Control
                      type="text"
                      placeholder={moneyFormat
                        .format(venta.value)
                        .replace(",00", "")}
                      readOnly
                    />
                  </Col>
                  <Col sm="4">
                    <Button variant="warning" onClick={handleShow}>
                      Agregar producto
                    </Button>
                  </Col>
                </Form.Group>

                <Form.Group className="mb-3">
                  <table
                    id="tbVentaProducto"
                    className="table table-striped col-5 col-s-12"
                  >
                    <thead>
                      <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio Un</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Total</th>
                        <th scope="col">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaproductosVenta.map((prod, index) => {
                        return (
                          <tr key={index + 1}>
                            <th scope="row">{index + 1 || ""}</th>
                            <td>{prod.code || ""}</td>
                            <td>{prod.desc || ""}</td>
                            <td>{prod.value || ""}</td>
                            <td>{prod.quantitySale || ""}</td>
                            <td>
                              {moneyFormat
                                .format(prod.quantitySale * prod.value)
                                .replace(",00", "")}
                            </td>
                            <td>
                              <Button
                                type="button"
                                className="btn btn-primary"
                                onClick={productoVentaEliminar}
                              >
                                <Image src={borrar} rounded id={prod._id} />
                              </Button>
                            </td>
                          </tr>
                        );
                      }, totalizar())}
                    </tbody>
                  </table>
                </Form.Group>

                <Form.Group as={Row}>
                  <Col sm="8"></Col>
                  <Col sm="4">
                    <Button variant="primary" onClick={ventaRegistrar}>
                      Registrar Venta
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Col sm="3">
                <Form.Label className="text-success">
                  Seleccione el producto
                </Form.Label>
              </Col>
              <Col sm="8">
                <Form.Select size="lg" onChange={handleChangeProducto}>
                  <option></option>
                  {listaproductos.map((producto, index) => {
                    return (
                      <option key={index} id={producto._id}>
                        {producto.name}
                      </option>
                    );
                  })}
                </Form.Select>
              </Col>
              <Col sm="2"></Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm="3"></Col>
              <Col sm="8">
                <Form.Label className="text-danger">
                  ( Unidades disponibles {disponible})
                </Form.Label>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="3">
                <Form.Label className="text-success">
                  Cantidad requerida
                </Form.Label>
              </Col>
              <Col sm="8">
                <Form.Control
                  type="Number"
                  value={cantidadRequerida}
                  placeholder="cantidad requerida"
                  onChange={handleChangeCantidad}
                />
              </Col>
              <Col sm="2"></Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={agregarProductoVenta}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RegistroVenta;
