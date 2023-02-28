const { response, request} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/JWT');

//! usar EXPRESS VALIDATOR
// if ( name.length <= 5 ){
//     return res.status(400).json({
//         ok: false,
//         msj: 'El nombre debe tener mas de 5 letras'
//     })
// } 

const nuevoUsuario = async ( req= request, res= response ) => {
    const { email, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ email });

        if (usuario){
            return res.status(400).json({
                ok: false,
                msj: 'Ya existe un usuario con ese correo'
            })
        }

        usuario = new Usuario( req.body );

        //?encriptar contrase;a
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        return res.status(201).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msj: 'Comuniquese con el admin, por favor'
        })
    }
}


const loginUsuario = async (req, res= response ) => {

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                ok: false,
                msj: 'No hay usuario con ese email'
            })
        }

        //confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msj: 'constrasenia no valida'
            })
        }

        // generar JWT
        const token = await generarJWT(usuario._id, usuario.name);

        return res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msj: 'Comuniquese con el admin, por favor'
        })
    }
}


const revalidarToken = async (req, res= response ) => {
    const { uid, name }= req;
   
    const nuevoToken = await generarJWT( uid, name );

    res.status(200).json({
        ok: true,
        nuevoToken
    });
}


module.exports= {
    nuevoUsuario,
    loginUsuario,
    revalidarToken
}