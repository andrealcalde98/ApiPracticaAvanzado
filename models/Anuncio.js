'use strict'

const mongoose = require('mongoose')

//definimos un esquema

var anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});


anuncioSchema.statics.lista = function (filtro, skip, limit, select, sort) { //metodos en modelo mejor con function
    const query = Anuncio.find(filtro)
    query.skip(skip)
    query.limit(limit)
    query.select(select)
    query.sort(sort)
    return query.exec()
}

//creamos modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema)

//exportamos modelo

module.exports = Anuncio;