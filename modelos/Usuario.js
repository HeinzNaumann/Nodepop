"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//creo el equema

const usuarioSchema = mongoose.Schema({
  email: { type: String },
  password: String,
});

usuarioSchema.statics.hashPassword = function (passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7);
};

usuarioSchema.methods.comparePassword = function (passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
};

// creo el modelo

const Usuario = mongoose.model("Usuario", usuarioSchema);

//exporto el modelo
module.exports = Usuario;
