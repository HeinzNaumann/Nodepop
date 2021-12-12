var express = require("express");
var router = express.Router();

/** GET /privado */

router.get("/", (req, res, next) => {
  res.render("privado");
});

module.exports = router;
