'use strict';

const express = require('express');

const router = express.Router();

const Anuncio = require('../../modelos/Anuncio');

// /api/anuncios
// Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
    try {
        const anuncios = await Anuncio.find();
        res.json({
            results: anuncios
        });
    } catch (err) {
        next(err);
    }
});



// /api/anuncios:id
// Obtener un anuncio

router.get('/:idnetificador', async (req, res, next) => {
    try {

        const _id = req.params.identificador;
        const anuncio = await Anuncio.find({ _id: _id });
        res.jayson({ result: anuncio });

    } catch (err) {
        next(err);
    }
});

// POST /api/agentes {body}
//crear un agente 
router.post('/', async (req, res, next) => {
    try {
        const anuncioData = req.body;
        const anuncio = new Anuncio(anuncioData);

        await anuncio.save();

        res.json({});
    } catch (err) {
        next(err);
    }
})



module.exports = router;