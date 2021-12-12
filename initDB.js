"use strict";

require("dotenv").config();

require("./lib/connectMongoose");

// conexion a la base de datos
const dbConnection = require("./lib/connectMongoose");

// modelo de agentes y usuario

const { Anuncio, Usuario } = require("./modelos");

const AnuncioData = require("./anunciosIniciales.json");

main().catch(err => console.log("Hubo un error", err));

async function main() {
  await initAnuncios();
  await initUsuarios();
  dbConnection.close();
}

async function initAnuncios() {
  // elimino todos los documentos de la colección de agentes
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear agentes iniciales
  const anuncios = await Anuncio.insertMany(AnuncioData.anuncios);
  console.log(`Creados ${anuncios.length} anuncios.`);
}

async function initUsuarios() {
  // elimino todos los usuarios de la coleccion
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios `);

  //Crear los usuarios iniciales

  //UserData.usuarios

  const usuarios = await Usuario.insertMany([
    {
      email: "user@example.com",
      password: await Usuario.hashPassword("1234"),
    },
  ]);

  console.log(`Creados ${usuarios.length} `);
}
