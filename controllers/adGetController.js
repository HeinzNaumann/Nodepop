"use strict";

const express = require("express");

const Anuncio = require("../modelos/Anuncio");
class AdGetController {
  index(req, res, next) {
    res.locals.error = "";
    res.render("privado");
  }
  // /api/anuncios
  // Devuelve una lista de anuncios
  async get(req, res, next) {
    try {
      const nombre = req.query.nombre;
      const precio = req.query.precio;
      const venta = req.query.venta;
      const tags = req.query.tags;
      const skip = parseInt(req.query.skip);
      const limit = parseInt(req.query.limit);
      const select = req.query.select; // campos
      const sort = req.query.sort;

      const filtro = {};

      if (nombre) {
        filtro.nombre = new RegExp("^" + nombre, "i");
      } else if (venta) {
        filtro.venta = venta;
      } else if (tags) {
        filtro.tags = tags;
      } else if (precio) {
        const arrayPrecio = precio.split("-");

        if ((arrayPrecio[0] !== "") & (arrayPrecio[1] !== "")) {
          filtro.precio = { $gte: arrayPrecio[0], $lte: arrayPrecio[1] };
        } else if ((arrayPrecio[0] !== "") & (arrayPrecio[1] === "")) {
          filtro.precio = { $gte: arrayPrecio[0] };
        } else if ((arrayPrecio[0] === "") & (arrayPrecio[1] !== "")) {
          filtro.precio = { $lte: arrayPrecio[1] };
        }
      }

      const anuncios = await Anuncio.lista(filtro, skip, limit, select, sort);
      console.log(res.body);
      res.json([{ anuncios }]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdGetController;
