'use strict'

const express = require('express')
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre
        const venta = req.query.venta
        const precio = req.query.precio
        const foto = req.query.foto
        const tags = req.query.tags
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        const sort = req.query.sort
        const select = req.query.select //filtrar por tags
        const $lte = { '$lte': 50 }
        const $gte = { '$gte': 10 }
        const $gte$lte = { '$gte': 10, '$lte': 50 }
        const $e = 50
        const filtro = {}; //filtro vacio para que devuelta todo

        if (nombre) {
            filtro.nombre = nombre;
        }

        if (nombre) {
            filtro.nombre = new RegExp('^' + req.query.nombre, 'i');
        }

        if (venta) {
            filtro.venta = venta;
            console.log(venta);
        }

        // filtro precio
        if (precio === '-50') {
            filtro.precio = $lte;
        } else if (precio === 50) {
            filtro.precio = $e;
        } else if (precio === '10-') {
            filtro.precio = $gte;
        } else if (precio === '10-50') {
            filtro.precio = $gte$lte;
        }

        if (tags) {
            filtro.tags = tags;
        }

        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort) //busca la lista en el objecto creado conectado a la BBDD
        res.render('index', { 'anuncios': anuncios })
        res.json({ results: anuncios }) //lo devuelve el Json
    } catch (err) {
        next(err);
    }
});

// POST /api/anuncios (body) -> completar en Postman
// Crear un agente
router.post('/', async (req, res, next) => {
    try {
        const anunciosData = req.body;
        const anuncio = new Anuncio(anunciosData);

        const anuncioCreado = await anuncio.save(); // creamos anuncio en la BBDD
        res.status(201).json({ result: anuncioCreado });
    } catch (err) {
        next(err);
    }
});

//DELETE /api/anuncios/id
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        await Anuncio.deleteOne({ _id: _id })
        res.json();
    } catch (err) {
        next(err);

    }
})

//PUT /api/anuncios/id
router.put('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;
        const anunciosData = req.body;

        const anuncioActualizado = await Anuncio.findOneAndUpdate({ _id: _id }, anunciosData, {
            new: true //esto final del agente, si no lo ponemos nos devuelve el dato sin actualizar
        })
        res.json({ result: anuncioActualizado });
    } catch (err) {
        next(err);

    }
})



module.exports = router;
