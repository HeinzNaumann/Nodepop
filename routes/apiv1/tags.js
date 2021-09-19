'use strict';

const express = require('express');

const router = express.Router();

const Tag = require('../../modelos/Anuncio');

// /api/tags
// Devuelve una lista de Tags
router.get('/', async (req, res, next) => {

    try {
        const Tags = await Tag.distinct('tags');

        res.json({ result: Tags });


    } catch (err) {
        next(err);
    }
});




module.exports = router;