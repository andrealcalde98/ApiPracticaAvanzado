'use strict'

//conexion a la BD

const dbConnection = require('./lib/connectMongoose') //Esta es la conexión 
//const mongoose = require('mongoose') //Tambien sirve


//modelo de agentes

const Anuncio = require('./models/Anuncio')
const anuncioData = require('./anuncios.json')
const { db } = require('./models/Anuncio')

main().then(err => { //el then actua como catch para devolver un error
    console.log('Hubo un error')
})

async function main() {
    await initAnuncios();

    dbConnection.close()
}

async function initAnuncios() {
    // elimino todos los documentos de la table anuncios
    const deleted = await Anuncio.deleteMany();
    console.log(`Borrados ${deleted.deletedCount} anuncios`)

    // crear anuncios iniciales importados desde JSON

    const anuncios = await Agente.insertMany(anuncioData.anuncios)
    console.log(`Creados ${anuncios.length} agentes`)


}