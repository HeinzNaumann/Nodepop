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


anuncioSchema.statics.lista = function (filtro, skip, limit, select, sort) {
    const query = Anuncio.find(filtro);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec();
}
//creamos el modelo

const Anuncio = mongoose.model('Anuncio', anuncioSchema);


//exportamos el modelo (opcional)

module.exports = Anuncio;