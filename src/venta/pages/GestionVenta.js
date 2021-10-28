import Menu from "../../Shared/components/Menu";
import { Container, Col, Row, Form, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import editar from "../../Shared/assets//edit.svg";
import borrar from "../../Shared/assets//delete.svg";
import "../../css/myModal.css";
import Swal from "sweetalert2";

const GestionVenta = () => {
  //Hooks para actualizar lista de ventas, venta seleccionada, productos asociados a una venta y filtro
  //de búsqueda de ventas
  const [ventas, setVentas] = useState([]);
  const [ventaSel, setventaSel] = useState([]);
  const [listaproductosVenta, setListaproductosVenta] = useState([]);
  const [listaproductosVentaRetiro, setListaproductosVentaRetiro] = useState(
    []
  );
  const [filtro, setFiltro] = useState("");

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
    setventaSel({ ...ventaSel, [event.target.name]: event.target.value });
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
  //Función para registrar cambio en el campo cantidad de producto requerida
  const handleChangeCantidad = (event) => {
    setCantidadRequerida(event.target.value);
  };

  //Hooks y funciones para controlar visibilidad de la pantalla modal que permite la edición de la venta
  const [show, setShow] = useState(false);
  const handleShow = () => {
    consultarVendedores();
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  //Función para deshabilitar la edición de la venta cuando su estado sea diferente a En Proceso
  const deshabilitaEdicion = (estado) => {
    if (estado === "En proceso") {
      return false;
    } else {
      return true;
    }
  };

  //Hooks y funciones para controlar visibilidad de la pantalla modal que permite asociar un producto
  //a la venta
  const [showP, setShowP] = useState(false);
  const handleShowP = () => {
    consultarProductos();
    setShowP(true);
  };
  const handleCloseP = () => {
    setShowP(false);
    setDisponible(0);
  };

  //Función para totalizar la cantidad de items y el valor de la venta  a partir de los productos asociados
  function totalizar() {
    ventaSel.value = listaproductosVenta.reduce(
      (prev, next) => prev + next.value * next.quantitySale,
      0
    );
    ventaSel.quantity = listaproductosVenta.reduce(
      (prev2, next2) => parseInt(prev2) + parseInt(next2.quantitySale),
      0
    );
  }

  //Función para pintar la alerta color del estado de la venta
  const colorAlertaEstado = (estado) => {
    if (estado === "Finalizada") {
      return "bg-success text-white";
    } else if (estado === "Anulada") {
      return "bg-danger text-white";
    } else if (estado === "En proceso") {
      return "bg-warning text-white";
    }
  };

  //Función para agregar producto a la venta
  const agregarProductoVenta = () => {
    if (cantidadRequerida <= disponible) {
      async function fetchData() {
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/products/" + productoSel
        );
        const data = await response.json();
        if (data) {
          var prod = {
            sale: ventaSel,
            product: data,
            value: parseInt(data.value),
            quantitySale: parseInt(cantidadRequerida),
          };
          setListaproductosVenta([...listaproductosVenta, prod]);
          setCantidadRequerida(1);
        }
      }
      fetchData();
      handleCloseP();
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
    if (e.target.id) {
      setListaproductosVentaRetiro([...listaproductosVentaRetiro, e.target.id]);
    }
    listaproductosVenta.splice(index, 1);
  };

  //Función para consultar la venta y todos los productos a partir de su id seleccionado desde la tabla
  const ventaSeleccion = (e) => {
    async function fetchDataVenta() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/sales/" + e.target.id
      );
      const data = await response.json();
      if (data) {
        setventaSel(data);
      }
    }
    async function fetchDataVentaProductos() {
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/saleProduct/list/" + e.target.id
      );
      const data = await response.json();
      if (data) {
        setListaproductosVenta(data);
      }
    }
    fetchDataVentaProductos();
    fetchDataVenta();

    handleShow();
  };

  //Función para eliminar una venta seleccionada desde la tabla
  const ventaEliminar = (e) => {
    async function fetchData() {
      const config = {
        method: "DELETE",
      };
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/sales/remove/" + e.target.id,
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
        "https://digytosback.herokuapp.com/api/sales/search/" + e.target.value
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
  const ventaActualizar = (idVenta) => {
    async function actualizaVenta() {
      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaSel),
      };
      const response = await fetch(
        "https://digytosback.herokuapp.com/api/sales/modify/" + idVenta,
        config
      );
      const data = await response.json();
      if (data) {
        popupExitoso("Actualización exitosa");
      }
    }
    async function agregarProductosVenta() {
      listaproductosVenta.map(async (x) => {
        const config = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sale: x.sale,
            product: x.product,
            value: parseInt(x.value),
            quantitySale: parseInt(x.quantitySale),
          }),
        };
        if (!x._id) {
          await fetch("https://digytosback.herokuapp.com/api/saleProduct/add/", config);
          disminuirStockProducto(x.product, x.quantitySale);
        }
      });
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
        "https://digytosback.herokuapp.com/api/products/modify/" + Prod._id,
        config
      );
      await response.json();
    }

    async function retirarProductosVenta() {
      listaproductosVentaRetiro.map(async (x) => {
        const config = {
          method: "DELETE",
        };
        const response = await fetch(
          "https://digytosback.herokuapp.com/api/saleProduct/remove/" + x,
          config
        );
        await response.json();
      });
    }

    validarCamposRequeridos();
    if (validado) {
      retirarProductosVenta();
      agregarProductosVenta();
      actualizaVenta();
      handleClose();
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
    if (ventaSel.nameEmploye === "") {
      popupFallido("El nombre del vendedor es requerido");
      validado = false;
    }
    if (ventaSel.nameClient === "") {
      popupFallido("El nombre del cliente es requerido");
      validado = false;
    }
    if (ventaSel.docIdent === "") {
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

  //Función para consultar todos las ventas
  useEffect(() => {
    async function fetchData() {
      if (filtro.length === 0) {
        const response = await fetch("https://digytosback.herokuapp.com/api/sales/list");
        const data = await response.json();
        if (data) {
          setVentas(data);
        }
      }
    }
    fetchData();
  });

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
                              <td>
                                {moneyFormat
                                  .format(venta.value)
                                  .replace(",00", "")}
                              </td>
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

      <Modal show={show} onHide={handleClose} dialogClassName="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Actualizar venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Col sm="2">
                <Form.Label>Fecha venta</Form.Label>
              </Col>
              <Col sm="4">
                <Form.Control
                  type="text"
                  value={ventaSel.date || ""}
                  readOnly
                />
              </Col>

              <Col sm="2">
                <Form.Label>Estado</Form.Label>
              </Col>
              <Col sm="4">
                <Form.Select
                  size="lg"
                  value={ventaSel.estado || ""}
                  name="estado"
                  onChange={handleChange}
                  disabled={deshabilitaEdicion(ventaSel.estado)}
                >
                  <option>En proceso</option>
                  <option>Finalizada</option>
                  <option>Anulada</option>
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm="2">
                <Form.Label>Código</Form.Label>
              </Col>
              <Col sm="6">
                <Form.Control
                  type="text"
                  value={ventaSel.code || ""}
                  name="code"
                  onChange={handleChange}
                  placeholder="Código de la venta"
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
                  disabled={deshabilitaEdicion(ventaSel.estado)}
                  value={ventaSel.docIdent || ""}
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
                  disabled={deshabilitaEdicion(ventaSel.estado)}
                  value={ventaSel.nameClient || ""}
                  name="nameClient"
                  onChange={handleChange}
                  placeholder="Nombre del cliente"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm="2">
                <Form.Label>Vendedor</Form.Label>
              </Col>
              <Col sm="6">
                <Form.Select
                  size="lg"
                  disabled={deshabilitaEdicion(ventaSel.estado)}
                  value={ventaSel.nameEmploye || ""}
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
              <Col sm="2">
                <Form.Label>Valor neto venta</Form.Label>
              </Col>
              <Col sm="6">
                <Form.Control
                  type="text"
                  value={moneyFormat.format(ventaSel.value).replace(",00", "")}
                  readOnly
                />
              </Col>
              <Col sm="4">
                <Button
                  variant="warning"
                  onClick={handleShowP}
                  disabled={deshabilitaEdicion(ventaSel.estado)}
                >
                  Agregar producto
                </Button>
              </Col>
            </Form.Group>
          </Form>

          <Form.Group className="mb-3">
            <table
              id="tbVentaProducto"
              className="table table-striped col-5 col-s-12"
            >
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Código</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Precio Un</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Total</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {listaproductosVenta.map((prodVenta, index) => {
                  return (
                    <tr key={index + 1}>
                      <th scope="row">{index + 1}</th>
                      <td>{prodVenta.product.code}</td>
                      <td>{prodVenta.product.name}</td>
                      <td>{prodVenta.value}</td>
                      <td>{prodVenta.quantitySale}</td>
                      <td>
                        {moneyFormat
                          .format(prodVenta.value * prodVenta.quantitySale)
                          .replace(",00", "")}
                      </td>
                      <td>
                        <Button
                          type="button"
                          className="btn btn-primary"
                          disabled={deshabilitaEdicion(ventaSel.estado)}
                          onClick={productoVentaEliminar}
                        >
                          <Image src={borrar} rounded id={prodVenta._id} />
                        </Button>
                      </td>
                    </tr>
                  );
                }, totalizar())}
              </tbody>
            </table>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => ventaActualizar(ventaSel._id)}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showP} onHide={handleCloseP}>
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
          <Button variant="secondary" onClick={handleCloseP}>
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

export default GestionVenta;
