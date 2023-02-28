/*
    Rutas de usuarios / auth
    host + /api/auth

*/
const { Router } = require('express');
const router = Router();

const { check } = require('express-validator')
const { nuevoUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const validarJwt = require('../middlewares/validar-jwt');


router.post('/new',[
    check( 'name', 'El nombre es obligatorio').not().isEmpty(),
    check( 'email', 'El email es obligatorio').isEmail(),
    check( 'password', 'El password es obligatorio y tiene un minimo de 4 letras').not().isEmpty().isLength({ min:4 }),
    validarCampos
],nuevoUsuario);

router.post('/',[
    check( 'email', 'El email es obligatorio').isEmail(),
    check( 'password', 'El password es obligatorio y tiene un minimo de 4 letras').not().isEmpty(),
    check( 'password', 'El password tiene un minimo de 4 letras').isLength({ min:4 }),
    validarCampos
],loginUsuario);

router.get('/renew',[
    validarJwt
],revalidarToken);


module.exports = router;