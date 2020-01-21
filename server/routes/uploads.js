const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuarioDB')
const Producto = require('../models/productoDB')
/**File System */
const fs = require('fs');
/**PATH */
const path = require('path');

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

app.put('/uploads/:type/:id', (req, res) => {

    let type = req.params.type;
    let id = req.params.id

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            err: {

                err: 'Ningún archivo fue subido.'
            }
        });
    }

    //Validar Tipos
    let types = ['usuarios', 'productos']
    if (types.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Se permiten solo estos tipos: ' + types.join(', ')


        })
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let archivo = req.files.archivo;
    let nombreArch = archivo.name.split('.')
    let extension = nombreArch[nombreArch.length - 1]

    //extensiones permitidas
    let extensions = ['png', 'jpeg', 'gif', 'jpg']

    if (extensions.indexOf(extension) < 0) {

        return res.status(400).json({
            ok: false,
            message: 'Se permiten solo estas extensiones: ' + extensions.join(', ')


        })
    } else {

        //cambiar nombre archivo
        let miliSec = new Date().getMilliseconds()
        let newArchName = `${id}-${miliSec}.${extension}`
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(`uploads/${type}/${newArchName}`, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            /**UNA VEZ CARGADA LA IMAGEN SE PROCEDE A TRBAJAR EL ESQUEMA USUARIO */
            switch (type) {
                case 'usuarios':
                    imagenUsuario(id, res, newArchName);
                    break;
                case 'productos':
                    imagenProducto(id, res, newArchName);
                    break;
                default:
                    err
                    break;
            }
           
            

        });
    }
});

function imagenUsuario(id, res, newArchName) {
    Usuario.findById(id, (err, usuarioDB) => {

        if (err) {
            borraArchivo(newArchName, 'usuarios')
            return res.status(500)
                .json({
                    ok: false,
                    err
                })
        }

        if (!usuarioDB) {
            borraArchivo(newArchName, 'usuarios')
            return res.status(400)
                .json({
                    ok: false,
                    message: 'Usuario no existe'
                })
        }

        borraArchivo(usuarioDB.img, 'usuarios');
        usuarioDB.img = newArchName;
        usuarioDB.save((err, userSaved) => {
            return res.json(
                {
                    ok: true,
                    usuario: userSaved,
                    img: newArchName
                })
        })
    })
}


function imagenProducto(id, res, newArchName) {

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            borraArchivo(newArchName, 'productos')
            return res.status(500)
                .json({
                    ok: false,
                    err
                })
        }

        if (!productoDB) {
            borraArchivo(newArchName, 'productos')
            return res.status(400)
                .json({
                    ok: false,
                    message: 'Usuario no existe'
                })
        }

        borraArchivo(productoDB.img, 'productos');
        productoDB.img = newArchName;
        productoDB.save((err, productSaved) => {
            return res.json(
                {
                    ok: true,
                    producto: productSaved,
                    img: newArchName
                })
        })
    })

}

function borraArchivo(newArchName, type) {

    let pathImg = path.resolve(__dirname, `../../uploads/${type}/${newArchName}`)
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg)
    }


}







module.exports = app;