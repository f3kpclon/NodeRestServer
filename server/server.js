require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/**Configuración de rutas (usar debajo de los parseadores de body)*/
app.use(require('./routes/index'));


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
