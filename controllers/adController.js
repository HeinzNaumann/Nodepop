"use strict";
const { Requester } = require("cote");
const { Anuncio } = require("../modelos");

const fs = require("fs");

const requester = new Requester({ name: "nodepop-image-controller" });

class AdController {
  index(req, res, next) {
    res.locals.error = "";
    res.render("privado");
  }

  async post(req, res, next) {
    try {
      //console.log(req.file);

      const { nombre, precio, venta, tags } = req.body;
      const foto = req.file.originalname;

      // buscar el usuario en la BD
      await Anuncio.insertMany({
        nombre,
        precio,
        venta,
        tags,
        foto,
      });
      requester.send(
        {
          type: "convertir-imagen",
          prueba: req.file,
        },
        prueba => {
          console.log(prueba.originalname);
          // fs.writeFile("prueba.jpg", prueba.originalname, error => {
          //   if (error) {
          //     console.log(`${error}`);
          //   }
          // });
        },
      );

      res.json([req.body, `${req.file.path}`]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdController;
