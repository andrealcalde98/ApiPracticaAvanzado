var express = require('express');
const router = express.Router();
const Anuncio = require('../models/Anuncio')

router.get('/', async (req, res, next) => {
    try {
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        const sort = req.query.sort
        const select = req.query.select
        const filtro = {}; //filtro vacio para que devuelta todo

        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort)
        res.render('tags', { 'anuncios': anuncios }) // Renderizamos para el frontend
        res.json({ results: anuncios }) //lo devuelve el Json
    } catch (err) {
        next(err);
    }
});

module.exports = router;
