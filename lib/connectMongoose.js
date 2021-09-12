//Modelo para la conexion con la base de datos

'use strict'

const mongoose = require('mongoose');

mongoose.connection.on('error', err => { //al conectarse si da error
    console.log('Error de connexión', err)
    process.exit(1)
})

mongoose.connection.on('open', () => { //la primera vez
    console.log('Conectado a MongoDB en', mongoose.connection.name)
})

mongoose.connect('mongodb://localhost/ApiPractica', {})

module.exports = mongoose.connection;