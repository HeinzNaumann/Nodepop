"use strict";

const jwt = require("jsonwebtoken");

const { Usuario } = require("../modelos");

class Logincontroller {
  index(req, res, next) {
    res.locals.error = "";
    res.render("login");
  }

  async post(req, res, next) {
    try {
      const { email, password } = req.body;

      // buscar el usuario en la BD
      const user = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!user || !(await user.comparePassword(password))) {
        res.locals.error = res.__("Invalid credential");
        res.render("login");
        return;
      }

      // apuntar en su sesion si esta autentificado
      req.session.usuarioLogueado = {
        _id: user._id,
      };

      // si lo encuentro y la contraseña coincide lo envio a su zona privada

      res.redirect("/privado");
    } catch (err) {
      next(err);
    }
  }

  logout(req, res, next) {
    req.session.regenerate(err => {
      if (err) {
        next(err);
        return;
      }

      res.redirect("/");
    });
  }

  //POST /apiv1/authenticate
  async postJWT(req, res, next) {
    try {
      const { email, password } = req.body;
      // buscar el usuario en la BD
      const user = await Usuario.findOne({ email });

      // si no lo encuentro o no coincide la contraseña --> error
      if (!user || !(await user.comparePassword(password))) {
        res.json({ error: "Invalid credential" });

        return;
      }

      // si el usuario existe y valida la contraseña
      // crear un JWT con el _id del usuario dentro
      jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2h" },
        (err, jwtToken) => {
          if (err) {
            next(err);
            return;
          }
          //devolver al cliente al token
          res.json({ token: jwtToken });
        },
      );
    } catch (err) {
      next();
    }
  }
}

module.exports = Logincontroller;
