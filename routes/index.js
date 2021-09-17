var express = require('express');
var router = express.Router();
// const Anuncio = require('../models/Anuncio')

/* GET home page. */
router.get('/', async function (req, res, next) {
  const sort = req.query.sort
  const limit = parseInt(req.query.limit)

  // const filtro = {}; //filtro vacio para que devuelta todo
  // const anuncios = await Anuncio.lista(filtro, sort, limit)
  // res.render('index', { 'anuncios': anuncios })

});

module.exports = router;

