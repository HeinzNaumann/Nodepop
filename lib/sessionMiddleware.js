"use strcit";

// modulo que exporta un middleware
module.exports = (req, res, next) => {
  if (!req.session.usuarioLogueado) {
    res.redirect("/login");
    return;
  }

  next();
};
