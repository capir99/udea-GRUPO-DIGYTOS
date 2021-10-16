const Venta = require("../models/ventaModel");

//metodo para listar las ventas
exports.getVentas = (req, res) => {
  Venta.find().then((postResult) => {
    res.status(200).json(postResult);
  });
};

//metodo para crear una nueva venta
exports.addVenta = (req, res) => {
  const venta = new Venta({
    code: req.body.code,
    docIdent: req.body.docIdent,
    nameClient: req.body.nameClient,
    nameEmploye: req.body.nameEmploye,
    value: req.body.value,
    quantity: req.body.quantity,
    date: new Date().toLocaleString(),
    estado: "En proceso",
  });
  venta.save().then((created) => {
    res.status(201).json("Venta creada satisfactoriamente");
  });
};

//metodo para eliminar una venta
exports.removeVenta = (req, res) => {
  const filter = { _id: req.params.id };
  Venta.deleteOne(filter).then(() => {
    res.status(201).json("Venta eliminada satisfactoriamente");
  });
};

//metodo para consultar una venta por su ID
exports.getVentaById = (req, res) => {
  Venta.findById(req.params.id).then((Result) => {
    if (Result) {
      res.status(200).json(Result);
    } else {
      res.status(404).json("Venta no encontrada");
    }
  });
};

//metodo para consultar una venta por su codigo
exports.getVentaByCode = (req, res) => {
  const filter = { code: { $regex: "^" + req.params.code, $options: "i" } };

  Venta.find(filter).then((Result) => {
    if (Result) {
      res.status(200).json(Result);
    } else {
      res.status(404).json("Venta no encontrada");
    }
  });
};

//metodo para modificar una venta existente
exports.modifyVenta = (req, res) => {
  const filter = { _id: req.params.id };

  Venta.findOne(filter).then((Result) => {
    if (Result) {
      Result.code = req.body.code;
      Result.docIdent = req.body.docIdent;
      Result.nameClient = req.body.nameClient;
      Result.nameEmploye = req.body.nameEmploye;
      Result.value = req.body.value;
      Result.quantity = req.body.quantity;
      Result.estado = req.body.estado;
      Result.save().then(() => {
        res.status(201).json("Venta actualizada satisfactoriamente");
      });
    } else {
      res.status(404).json("Venta no encontrada");
    }
  });
};
