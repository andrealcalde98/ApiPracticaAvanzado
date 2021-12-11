'use strict'

const { query } = require('express');
const express = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/anuncios')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

// Requester de miniatura
const { Requester } = require('cote');
const requester = new Requester({ name: 'publisher' });

router.get('/', async (req, res, next) => {
    try {
        const nombre = req.query.nombre
        const venta = req.query.venta
        const precio = req.query.precio
        const tags = req.query.tags
        const skip = parseInt(req.query.skip)
        const limit = parseInt(req.query.limit)
        const sort = req.query.sort
        const select = req.query.select
        const $lte = { '$lte': 50 }
        const $gte = { '$gte': 10 }
        const $gte$lte = { '$gte': 10, '$lte': 50 }
        const $e = 50

        const filtro = {}; //filtro vacio para que devuelta todo

        // Añadimos una expresión regular para que buscar palabras que coincidan con las letras puestas (no case sensitive)
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
        res.json({ results: anuncios }) //lo devuelve el Json
    } catch (err) {
        next(err);
    }
});

// // POST /api/anuncios (body) -> completar en Postman
// // Crear un anuncio
// router.post('/', async (req, res, next) => {
//     try {
//         const anunciosData = req.body;
//         const anuncio = new Anuncio(anunciosData);
//         const anuncioCreado = await anuncio.save(); // creamos anuncio en la BBDD

//         res.status(201).json({ result: anuncioCreado });
//     } catch (err) {
//         next(err);
//     }
// });

// POST /api/anuncios (body) -> completar en Postman | Multer
// Crear un anuncio
router.post('/', upload.single('foto'), async (req, res, next) => {
    try {
        const fotoPath = '/images/anuncios/' + req.file.originalname;
        const anunciosData = { ...req.body, foto: fotoPath };
        const anuncio = new Anuncio(anunciosData);
        const anuncioCreado = await anuncio.save(); // creamos anuncio en la BBDD

        res.status(201).json({ result: anuncioCreado });

        // crear miniatura
        requester.send({
            type: 'thumbnail',
            url: req.file.path,
            name: req.file.originalname,
        }, resultado => {
            console.log('publisher obtiene resultado: ', resultado);
        })

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
            new: true //si no lo ponemos nos devuelve el dato sin actualizar
        })
        res.json({ result: anuncioActualizado });
    } catch (err) {
        next(err);

    }
})

module.exports = router;
