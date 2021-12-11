// conexion a la base de datos
const dbConnection = require('./lib/connectMongoose');

// modelo de anuncios
const Anuncio = require('./models/Anuncio');
const anuncioData = require('./anuncios.json');

// modelo de anuncios
const Usuario = require('./models/Usuario');

main().catch(err => console.log('Hubo un error', err));

async function main() {
    await initAnuncios();
    await initUsuarios();

    dbConnection.close();
}

async function initAnuncios() {
    // elimino todos los documentos de la colección de anuncios
    const deleted = await Anuncio.deleteMany();
    console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

    // crear anuncios iniciales
    const anuncios = await Anuncio.insertMany(anuncioData.anuncios);
    console.log(`Creados ${anuncios.length} anuncios.`);
}

async function initUsuarios() {
    const { deletedCount } = await Usuario.deleteMany();
    console.log(`Eliminados ${deletedCount} usuarios.`);

    const result = await Usuario.insertMany([
        {
            email: 'admin@example.com',
            password: await Usuario.hashPassword('1234')
        },
        {
            email: 'user@example.com',
            password: await Usuario.hashPassword('1234')
        }
    ]);
    console.log(`Insertados ${result.length} usuarios.`)
}