//imports
const path = require('path');    
const express = require('express');                         //instanciar al módulo express
const app = express();                                      // instanciar el módulo
const connectDB = require('./src/db/Connection');
const morgan = require('morgan');

//Conectar a la base por mongoose
connectDB();

//Importar enrrutadores
const indexRoutes = require('./src/routes/index')


//Configuración
app.set('views', path.join(__dirname,'/views'));
app.set('view engine', 'ejs');


//Middlelwares
app.use(morgan('dev'));

//llamar enrrutadores
app.use('/', indexRoutes); 

//Iniciando servidor haciendo que app escuche por un puerto
const Port = process.env.Port || 3000;
app.listen(Port, () => console.log('Servidor Iniciado en el puerto ' + Port));    