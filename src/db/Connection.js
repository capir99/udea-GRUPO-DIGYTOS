
const mongoose = require('mongoose');
const URI = "mongodb+srv://webapp_conn:Digytos2021@cluster0.dssyh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(URI, { 
        useUnifiedTopology: true, 
        useNewUrlParser: true 
    });
    console.log('Base de datos conectada!!!');
};

module.exports = connectDB;