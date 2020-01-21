const express = require('express');
const app = express();
const Usuario = require('../models/usuarioDB');
const bicrypt = require('bcryptjs');
const { verifyToken, validateRole } = require('../middlewares/authentication')
const _ = require('underscore');



app.get('/usuario/find', verifyToken, (req, res) => {
    let id = req.query.id

    Usuario.findById(id, (err, userDB) => {
        if (err) {
            return res.status(404).json({
                ok: false,
                err: {
                    message: `el usuario con id = ${id} no existe `
                }
            })
        }

        res.json({
            ok: true,
            usuario: userDB
        })

    })
});

app.get('/usuario', verifyToken, (req, res) => {

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

app.post('/usuario', [verifyToken, validateRole], (req, res) => {

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

app.put('/usuario/:id', [verifyToken, validateRole], (req, res) => {

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

app.delete('/usuario/:id', [verifyToken, validateRole], (req, res) => {
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
