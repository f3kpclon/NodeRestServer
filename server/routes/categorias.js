const express = require('express');
const { verifyToken, validateRole } = require('../middlawares/authentication');
const Categoria = require('../models/categoriaDB');
const app = express();

/**GET Categorias */
app.get('/categorias', verifyToken, (req, res) => {
    
    Categoria.find({}).
        sort('descripcion').
        populate('usuario','nombre email').
        exec((err, categorias) =>{

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                })
            }

            return res.json({
                ok: true,
                categorias
            })

        });
});
/**GET categorias by id */
app.get('/categorias/:id', (req, res) => {
return 	
});

/**POST CATEGORIA */
app.post('/categoria', verifyToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        return res.json({
            ok: true,
            categoria: categoriaDB
        })
    })

});

app.put('/categoria/:id', verifyToken, (req, res) => {

    let id = req.params.id;
    let descCategoria = req.body.descripcion;

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        return res.json({
            ok: true,
            categoria: categoriaDB
        })


    })
});

app.delete('/categoria/:id',[validateRole,verifyToken], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, deletedCategoria) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!deletedCategoria) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'categoria no encontrada'
                }
            })
        }
        res.json({
            ok: true,
            categoria: deletedCategoria
        })

    })
});




module.exports = app;


