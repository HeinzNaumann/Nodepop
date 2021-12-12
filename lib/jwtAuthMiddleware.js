"use strict";

const { application } = require("express");
const jwt = require("jsonwebtoken");

// modulo que devuelve un middleware

module.exports = (req, res, next) => {
  // recoger el jwtToken de la cabecera (o de otros sitios)
  const jwtToken =
    req.get("Authorization") || req.query.token || req.body.token;
  //  comprobar que tengo un token
  if (!jwtToken) {
    const error = new Error("no token provided ");
    error.status = 401;
    res.json({ error: error.message, status: error.status });
    next(error);
    return;
  }
  // comprobar el token es valido
  jwt.verify(jwtToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      err.message = "invalid token";
      err.status = 401;
      res.json({ error: err.message, status: err.status });
      next(err);
      return;
    }

    //console.log({ payload });

    req.apiAuthUserId = payload._id;
    // si es valido, continuar
    next();
  });
};
