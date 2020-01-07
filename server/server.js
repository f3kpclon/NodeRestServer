require('./config/config');

const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(require('./routes/usuario'));


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



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