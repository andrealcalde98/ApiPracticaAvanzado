# ApiPractica

## Práctica DevOps.   

Enlace producción Práctica backend por DNS (DevOps)

```
    "http://ec2-3-229-242-209.compute-1.amazonaws.com/"
```

Enlace producción Práctica React por IP (DevOps)

Las credenciales para acceder son:

usuario: admin@admin.com

contraseña: 123456

```
    "http://3.229.242.209/"
```

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
## Autenticación🔧


Al hacer un POST hacia authenticate nos devuelve un token para acceder a los end points protegidos.

Ex:

```
    http://localhost:3000/api/authenticate
```

Las direccion protegida es:

Ex:

```
    http://localhost:3000/api/anuncios
```

Nos devolvera un JSON con la información del login, nos devolverá un HTTP 401 y la info del error tanto si el token ha caducado, hay un error o no existe.


## Internaccionalización 🔧

Si accedemos a la dirección web de nuestro API nos devuelve los anuncios disponibles, tendremos un switch para cambiar el idioma entre Español e Inglés.


## Subida de imagen con tarea en background 🔧

Este API permite subir una imagen des de /api/anuncios en modo form-data:

```
http://localhost:3000/api/anuncios
```

Cada vez que creemos subamos una imagen nos creara un thumbnail en el servidor en la direccion /public/images/thumbnails.

En este caso para encender el worker que nos permite generar miniatures dentremos que ejectura el siguiente controlador:

```
nodemon conversionService.js
```

Con este servicio ejecutando tendremos un worker que espera al POST que ejectura un publisher pidiendo que convierta en miniatura la imagen subida por el usuario.

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

