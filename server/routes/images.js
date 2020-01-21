const express = require('express');
const fs = require('fs');
const path = require('path');
const {verifyToken} = require('../middlewares/authentication')
const app = express();


app.get('/images/:type/:img',verifyToken, (req, res) => {

    let type = req.params.type;
    let img = req.params.img;
    let pathImg = path.resolve(__dirname, `../../uploads/${type}/${img}`)
    let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg')

   
    if (fs.existsSync(pathImg)) {

        res.sendFile(pathImg);

    } else {
        
        res.sendFile(noImgPath);
    }




});






module.exports = app;