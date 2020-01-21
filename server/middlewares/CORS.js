const cors = require('cors');


/***habilitar cors */
let CORS= ((req, res, next) => {
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    // Dominio que tengan acceso (ej. 'http://example.com')
       res.setHeader('Access-Control-Allow-Origin', '*');
    
    // Metodos de solicitud que deseas permitir
       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    
    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
       res.setHeader('Access-Control-Allow-Headers', '*');
    
    next();
    })

    module.exports ={
        CORS
    }