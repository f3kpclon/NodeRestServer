const jwt = require('jsonwebtoken');

/**Verificar TOKEN */
let verifyToken = (req, res, next) => {
    let token = req.get('Authorization')//retrieving the header

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario
        next()
    })

}

let verifyTokenImg = (req, res, next)=>{
    let token = req.query.token;

    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            })
        }

        req.usuario = decoded.usuario
        next()
    })
}

let validateRole = (req, res, next) => {

    let role = req.usuario.role;

    if (role === "ADMIN_ROLE") {
        next()
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no tiene permisos para hacer modificaciones'
            }
        })
    }

}

module.exports = {
    verifyToken,
    validateRole,
    verifyTokenImg
}