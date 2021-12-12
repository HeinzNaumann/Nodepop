## Nodepop

## Api para la venta de articulos de segunda mano

Para arrancar la base de datos se tiene que tener instalado:

1.  Node
2.  MongoDB

## uso

copiar el .env.example a .env y pon tus credenciales

Antes de empezar a cargar el proyecto se tiene que tener la base de datos arrancada de Mongo DB

El siguiente paso es cargar la base de datos con el siguiente script:

    npm run initDB

Para arrancar el programa se debe de añadir el siguiente script dentro de la carpeta /nodepop

    npm start

En caso de ser desarrollador seria:

    npm run dev

Para poder acceder al puerto de la API y al trabajar en nuestro pc la ruta seria:

    localhost:3000/apiv1/anuncios
    localhost:3000/apiv1/tags

Para poder acceder al puerto de la aplicación y al trabajar en nuestro pc la ruta seria:

    localhost:3000/

Formas de filtrado:

**/apiv1/anuncios/?nombre=** //Filtrado por nombre
**/apiv1/anuncios/?venta=** // (true/false) define si esta en venta o no
**/apiv1/anuncios/?precio=** //Rango de precios
**/apiv1/anuncios/?tags=** //Busqueda por etiquetas
**/apiv1/anuncios/?skip=** //para hacer paginación
