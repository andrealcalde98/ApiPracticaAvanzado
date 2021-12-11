# ApiPractica

Practica de Node.js/MongDB generando una API con express

## Comenzando 🚀

Estas instrucciones te permitirán arrancar el proyecto y la connexión con la base de datos.

Para iniciar la Base de Datos haremos lo siguiente:

```
    "node install_db.js"
```

Al añadirlo a package.json también podemos iniciarlo con el atajo:

```
    "npm run initDB"  
```

_Para iniciar el proyecto en modo desarrollo podemos hacer: 

```
    "npm run dev"  
```

## Ejectuando peticiones con Postman 📋

Para buscar por tags podemos usar Postman, en donde haremos un GET y en params habilitaremos una nueva "Key" llamada "nombre" y a su valor le pondremos un nombre para filtrar.

Ex:

```
    http://localhost:3000/api/anuncios?nombre=bici
```

El nombre originar esta en mayúsculas pero debido a que hemos añadido REGEXP podremos hacer busquedas mas avanzadas:
Ex:

```
    http://localhost:3000/api/anuncios?nombre=i
```

Nos encotraría el anuncio "iPhone"

De la misma forma podremos buscar por mas campos; nombre de artículo, venta (boolean), precio y etiqueta. Además podremos usar los filtros (skip, limit, sort, select)
Ex:

```
    http://localhost:3000/api/anuncios/?nombre=i&precio=10-&venta=false&tags=mobile&limit=1
```

## Creación del anuncio con Postamn 🔧

Para crear un anuncio con Postman deberemos escoger la opción POST, a continuación y con el enlace ya puesto escogeremos "body" e iremos añadiendo los parametros (nombre, venta, precio, foto y tag)
En "foto" recomendamos poner el enlace "/images/anuncios/iphone.png" ya que tenemos una imagen en el proyecto con ese nombre para el Frontend.
Recordamos el esquema para los datos:

```
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
```

Para finalizar y si es correcto nos mostrara el objeto creado y un código 201.
Ex:

````
"result": {
        "nombre": "Coche",
        "venta": true,
        "precio": 10000,
        "foto": "coche.jpg",
        "tags": [
            "lifestyle, motor"
        ],
        "_id": "61460da94ca976ebce7c5f26",
        "__v": 0
    }
````
## Borrar un anuncio con Postamn 🔧

Para borrar un anuncio unicament escogeremos la opción DELETE en Postman y procederemos a añadir "/id_a_borrar".
Ex:

```
http://localhost:3000/api/anuncios/61460c8c4ca976ebce7c5f20
```

No dará un 200 OK confirmando el funcionamiento.

## Actualización de un anuncio con Postman 🔧

Esta vez seleccionaremos la opción PUT e igual que con el borrado añadiremos "/id_a_borrar" acompañado de los datos a borrar ya se por enlace o por "Body" en Postman.
Ex (modificaremos en coche creado anteriormente):

```
    http://localhost:3000/api/anuncios/61460da94ca976ebce7c5f26
```

Anuncio cambiado con mensaje 200:

```
    "result": {
        "_id": "61460da94ca976ebce7c5f26",
        "nombre": "Coche",
        "venta": true,
        "precio": 10000,
        "foto": "/images/anuncios/coche.jpg",
        "tags": [
            "lifestyle, motor"
        ],
        "__v": 0
    }
```

## Accediento a una lista de etiquetas🛠️

Podemos acceder a una lista de etiquetas con el siguiente enlace:

```
    http://localhost:3000/tags
```
## Accediendo a las fotografias 

Para acceder a las fotografias del proyecto únicamente  hay que ir a la carpeta http://localhost:3000/images/anuncios/nombre_foto

```
    http://localhost:3000/images/anuncios/coche.jpg
```

## Frontend API 🛠️

Tenemos disponible una pagina html para representar los datos de la DB, podemos acceder a esta pagina a través del siguiente enlace:

````
    localhost:3000/
````

Este Frontend tambíen tiene todos los filtros disponibles, por lo tanto si hacemos una búsqueda por algun campo nos renderizarà la targeta.
Ex:

````
    http://localhost:3000/?precio=-50&?nombre=b&?tags=sport
````
## Autor ✒️

* **André Alcalde** - [andrealcalde98](https://github.com/andrealcalde98)

