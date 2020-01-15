require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const PATH = require('path');
const cors = require('cors');
const app = express();


app.use(cors());

//habilitar carpeta publica
app.use(express.static(PATH.resolve(__dirname,'../public')))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**Configuración de rutas (usar debajo de los parseadores de body)*/
app.use(require('./routes/index'));

/***CORS */
app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    })


mongoose.connect(
    process.env.URLDB
    , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true


    },
    (err, res) => {
        if (err) throw err;
        console.log('my_cafeDB is  ONLINE');

    });

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
console.log('');

