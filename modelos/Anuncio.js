'use strict';

const mongoose = require("mongoose");


//definimos un schema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    tags: [String],
    foto: String

})
//creamos el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);


//exportamos el modelo (opcional)

module.exports = Anuncio;