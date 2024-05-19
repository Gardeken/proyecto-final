require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const assigmentRouter = require("./controllers/assigments");

async function conectarDB() {
  try {
    await mongoose.connect(process.env.token);
    console.log("Conectado a la BD");
  } catch (error) {
    console.log(error);
  }
}

conectarDB();
//rutas de frontend

app.use("/", express.static(path.resolve("views", "home")));
app.use("/Contactanos", express.static(path.resolve("views", "contactanos")));
app.use("/Aplicar", express.static(path.resolve("views", "aplicar")));
app.use("/Carreras", express.static(path.resolve("views", "carreras")));
app.use("/Contactanos", express.static(path.resolve("views", "contactanos")));
app.use("/Login", express.static(path.resolve("views", "login")));
app.use("/controllers", express.static(path.resolve("controllers")));
app.use("/asignaciones", express.static(path.resolve("views", "asignaciones")));

//rutas backend

app.use("/api/assigment", assigmentRouter);

module.exports = app;
