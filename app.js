require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

async function conectarDB() {
  try {
    await mongoose.connect(process.env.token);
  } catch (error) {
    console.log(error);
  }
}

//rutas de frontend

app.use("/", express.static(path.resolve("views", "home")));
app.use("/Contactanos", express.static(path.resolve("views", "contactanos")));
app.use("/Aplicar", express.static(path.resolve("views", "aplicar")));
app.use("/Carreras", express.static(path.resolve("views", "carreras")));
app.use("/Contactanos", express.static(path.resolve("views", "contactanos")));
app.use("/Login", express.static(path.resolve("views", "login")));

module.exports = app;
