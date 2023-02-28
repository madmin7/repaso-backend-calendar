const express = require('express');
const { dbConnection } = require('./database/config');
// const router = require('./routes/auth');
require('dotenv').config();
const cors = require('cors');


const app = express();

//!CORS
app.use(cors());

//!Base de datos
dbConnection();


//!Directorio publico
app.use( express.static('public'));


//!Lectura y Parseo del body
app.use( express.json() );


//!Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// TODO: CRUD events




app.listen(process.env.PORT, () => {
    console.log(`escucuando desde el puerto ${ process.env.PORT }`)
})
