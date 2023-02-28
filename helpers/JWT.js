const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {
    return new Promise( ( resolve, reject ) => {
        //proceso de generacion de JWT
        const payload = {
            uid,
            name
        }

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if ( error ){
                console.log(error)
                reject('No se pudo generar token');
            }

            resolve( token );
        });
    })
}



module.exports = generarJWT;