# ApiPractica

Practica de Node.js/MongDB generando una API con express

## Comenzando 🚀

Estas instrucciones te permitirán arrancar el proyecto y la connexió con la base de datos.

Para iniciar la Base de Datos haremos la siguiente:

```
    "node install_db.js"
```

Al añadirlo a package.json también podemos iniciarlo:

```
    "npm run initDB"  
```

_Para iniciar el proyecto en modo desarrollo podemos hacer: 

```
    "npm run dev"  
```

### Ejectuando peticiones con Postman 📋

Para buscar por tags podemos usar Postman, en donde haremos un GET, en params habilitaremos una nueva "Key" llamada "tags" y a su valor le pondremos un nombre para filtrar.
Ex:

```
    http://localhost:3000/api/anuncios?tags=lifestyle
```

Mostrar lista

### Creación del anuncio con Postamn 🔧

Para crear un anuncio con Postman deberemos escoger la opción POST, a continuación y con el enlace ya puesto escogeremos "body" e iremos añadiendo los parametros (nombre, venta, precio, foto y tag)

Recordamos el esquema para los datos:

```
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
```

Para finalizar y si es correcto nos mostrara el objeto creado.

## Accediendo a las fotografias 

_Explica como ejecutar las pruebas automatizadas para este sistema_


## Frontend API 🛠️

_Menciona las herramientas que utilizaste para crear tu proyecto_

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - El framework web usado
* [Maven](https://maven.apache.org/) - Manejador de dependencias
* [ROME](https://rometools.github.io/rome/) - Usado para generar RSS

## Autore ✒️

* **Andrés Villanueva** - *Trabajo Inicial* - [villanuevand](https://github.com/villanuevand)
* **Fulanito Detal** - *Documentación* - [fulanitodetal](#fulanito-de-tal)

También puedes mirar la lista de todos los [contribuyentes](https://github.com/your/project/contributors) quíenes han participado en este proyecto. 
