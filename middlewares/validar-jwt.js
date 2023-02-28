const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const validarJwt = ( req= request, res= response, next ) => {
    // x-token headers
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msj: 'El token no es valido o no vino en la peticion'
        })
    }
    
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name= name;

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            ok: false,
            msj: 'El token no es valido'
        })
    }
    next();
}

module.exports = validarJwt;