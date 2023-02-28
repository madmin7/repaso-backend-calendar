/*
    Rutas de Eventos
    host + /api/events

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');


const router = Router();

// Todas tienen que pasar por la validacion del jwt
router.use( validarJwt );

// Obtener eventos
router.get('/', obtenerEventos);

// Crear nuevo evento
router.post('/',[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'La fecha de inicio es obligatoria').custom(isDate),
    check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos
], crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Borrar evento
router.delete('/:id', borrarEvento);


module.exports = router;