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

Las credenciales de acceso son

    Usuario:
    user@example.com

    Contraseña:
    1234

En caso de ser desarrollador seria:

    npm run dev

Para instalar las dependencias se utiliza el comando

    npm init

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

## Se a desarrollado un microservicio para crear una copia de una imagen a traves del end point de la Api

Se crea una copia de la imagen en formato 100 x 100

Para arrancar dicho microservicio se de arrancar /microservicio/publisher.js
