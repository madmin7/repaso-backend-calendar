const { request, response } = require("express");
const Evento = require("../models/Evento");




const obtenerEventos = async(req= request, res= response)=> {
    try {
        const eventos = await Evento.find()
                                    .populate('user', 'name');

        return res.status(200).json({
            ok: true,
            eventos
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const crearEvento = async (req= request, res= response)=> {
    try {
        const evento = new Evento(req.body);

        evento.user = req.uid;

        await evento.save();

        return res.status(200).json({
            ok: true,
            evento
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async (req= request, res= response)=> {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el evento por ese id'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no esta autorizado para realizar esa accion'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true });
        
        return res.status(200).json({
            ok: true,
            eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj:'Contactese con el administrador'
        });
    }
}


const borrarEvento = async (req= request, res= response)=> {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ){
            return res.status(404).json({
                ok: false,
                msg: 'No se encontro el evento por ese id'
            });
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'El usuario no esta autorizado para realizar esa accion'
            })
        }

        const eventoEliminado = await Evento.findByIdAndDelete(eventoId);
        
        return res.status(200).json({
            ok: true,
            eventoEliminado
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj:'Contactese con el administrador'
        });
    }
}








module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}