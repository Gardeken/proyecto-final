require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const assigmentRouter = require("./controllers/assigments");
const subjectRouter = require("./controllers/subjects");
const userRouter = require("./controllers/users");
const teacherRouter = require("./controllers/teachers");
const studentRouter = require("./controllers/students");

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
app.use("/portalUJMV", express.static(path.resolve("views", "portal")));

//rutas backend
app.use(express.json());
app.use("/api/assigment", assigmentRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);

module.exports = app;
