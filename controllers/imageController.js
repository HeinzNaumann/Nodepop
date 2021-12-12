"use strict";

const { Requester } = require("cote");

const requester = new Requester({ name: "nodepop-image" });

class ImageController {
  //GET /api/image
  index(req, res, next) {
    console.log(prueba);
    const { desde, hacia, cantidad } = req.params;

    // pedir a los microservicios que hagan la conversion

    requester.send(
      {
        type: "convertir-imagen",
        desde,
        hacia,
        cantidad,
      },
      resultado => {
        res.json({ result: resultado });
      },
    );
  }
}

module.exports = ImageController;
