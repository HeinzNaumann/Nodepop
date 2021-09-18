'use strict';

const express = require('express');

const router = express.Router();

const Anuncio = require('../../modelos/Anuncio');

// /api/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {

    try {

        const nombre = req.query.nombre;
        const precio = req.query.precio.split('-');
        const venta = req.query.venta;
        const tags = req.query.tags;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        // http://localhost:3000/api/agentes/?select=name address -_id
        const select = req.query.select; // campos
        const sort = req.query.sort;

        const filtro = {};

        if (nombre) {
            filtro.nombre = nombre;
        }

        if (precio) {
            filtro.precio = precio;
        }

        if (venta) {
            filtro.venta = venta;
        }




        const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
        res.render('api', { anuncios });
    } catch (err) {
        next(err);
    }
});




module.exports = router;