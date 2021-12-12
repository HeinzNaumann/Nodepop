var express = require("express");
var router = express.Router();

/** GET /features */

router.get("/", (req, res, next) => {
  res.render("features");
});

module.exports = router;
