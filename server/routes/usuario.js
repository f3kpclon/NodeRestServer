const express = require('express');
const app = express();
const Usuario = require('../models/usuarioDB');
const bicrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const _ = require('underscore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.json('get INICIALIZACION!!');
});

app.get('/usuario', function (req, res) {

    let since = req.query.since || 0;
    since = Number(since);

    let until = req.query.limit || 0
    until = Number(until);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(since)
        .limit(until)
        .exec((err, usuarios) => {


            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            //conteo de elementos en la colección
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            })



        })

});

app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bicrypt.hashSync(body.password),
        role: body.role
    })

    usuario.save((err, user) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario: user
        })
    })

});

app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuario) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuario
        });
    })

});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, deletedUser) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!deletedUser) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: deletedUser
        })

    })
});

module.exports = app
