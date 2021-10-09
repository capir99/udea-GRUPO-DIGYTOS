

//Conexión base de datos
const mongoose = require("mongoose");
const URI =
  "mongodb+srv://webapp_conn:Digytos2021@cluster0.dssyh.mongodb.net/digytosDB?retryWrites=true&w=majority";
//metodo conexión 1
mongoose.connect(URI).then(() => {
  console.log("Base de datos conectada!!!");
});

//inserción usuarios
const User = mongoose.model("User", {
  login: String,
  fullName: String,
  pass: String,
  rol: String,
});
const us1 = new User({
  login: "cpinto",
  fullName: "Camilo Pinto",
  pass: "cpinto2021",
  rol: "Administrador",
});
const us2 = new User({
  login: "asuarez",
  fullName: "Aicardo Suárez",
  pass: "asuarez2021",
  rol: "Vendedor",
});
const us3 = new User({
  login: "jruiz",
  fullName: "Jean Sebastian Ruiz",
  pass: "jruiz2021",
  rol: "Administrador",
});
const us4 = new User({
  login: "sniño",
  fullName: "Samuel Niño",
  pass: "sniño2021",
  rol: "Vendedor",
});
const us5 = new User({
  login: "jcortes",
  fullName: "Jhoan Felipe Cortés",
  pass: "jcortes2021",
  rol: "Administrador",
});

us1.save().then(() => {
  console.log("Registro exitoso");
});
us2.save().then(() => {
  console.log("Registro exitoso");
});
us3.save().then(() => {
  console.log("Registro exitoso");
});
us4.save().then(() => {
  console.log("Registro exitoso");
});
us5.save().then(() => {
  console.log("Registro exitoso");
});


