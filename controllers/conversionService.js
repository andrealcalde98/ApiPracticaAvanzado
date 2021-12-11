'use strict';

// Servicio de miniatura

const { Responder } = require('cote');
const sharp = require('sharp');
var Jimp = require('jimp');

// declarar el microservicio
const responder = new Responder({ name: 'Servicio de miniatura' });

// logica del microservicio

responder.on('thumbnail', (req, done) => {

  const { url, name } = req;
  // console.log('DATOS! ruta y nombre : ' + url + ' ' + name)

  sharp('../' + url).resize(100, 100).toFile('../public/images/thumbnails/' + name, (err, resizeImage) => {
    if (err) {
      console.log(err);
    } else {
      console.log(resizeImage);
      done(`Miniatura creada!`)
    }
  })

  // Jimp.read('../' + url)
  //   .then(foto => {
  //     return foto
  //       .resize(100, 100) // resize
  //       .write('../public/images/thumbnails/' + name); // save
  //   })
  //   .catch(err => {
  //     console.error(err);
  //   });

  // done(`Imagen creada con nombre: ${name}`)

})


