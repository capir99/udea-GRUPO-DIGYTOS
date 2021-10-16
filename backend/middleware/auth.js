const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuarioModel");

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.decode(token, process.env.JWT_KEY);
      if (decodedToken) {
        const filter = { email: decodedToken.email };
        Usuario.findOne(filter).then((userResult) => {
          if (userResult) {
            next();
          } else {
            const newUser = new Usuario({
              login: decodedToken.email,
              fullName: decodedToken.name,
              email: decodedToken.email,
              rol: "Vendedor",
              estado: "Pendiente",
            });
            newUser.save();
            next();
          }
        });
      }
    }
  }
};
