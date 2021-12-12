var express = require("express");
var router = express.Router();

/** GET /change-locale */

router.get("/:locale", (req, res, next) => {
  // recoger el idioma que me quiere cambiar

  const locale = req.params.locale;

  // poner cookie en respuesta que indique el nombre que me pide
  res.cookie("nodeapi-locale", locale, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
  // hacer una redireccion a la misma pagina que estaba en el usuario

  res.redirect(req.get("referer"));
});

module.exports = router;
