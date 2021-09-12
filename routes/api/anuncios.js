'use strict'

const express = require('express')
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

// Devolvemos la lista de anuncios sin filtros

router.get('/', async (req, res, next) => {
    try {
        const anuncios = await Anuncio.find() //busca la lista en el objecto creado conectado a la BBDD
        res.json({ results: anuncios }) //lo devuelve el Json
    } catch (err) {
        next(err);
    }
});

module.exports = router;
