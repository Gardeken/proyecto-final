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
const assigmentERouter = require("./controllers/assigmentsE");
const quarterRouter = require("./controllers/quarters");
const infoSubjectRouter = require("./controllers/infoSubjects");
const requestRouter = require("./controllers/requests");
const infoCareerRouter = require("./controllers/infoCareers");

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
app.use("/asignaciones", express.static(path.resolve("asignaciones")));
app.use("/aplicaciones", express.static(path.resolve("aplicaciones")));
app.use("/pensum", express.static(path.resolve("pensum")));

//rutas backend
app.use(express.json());
app.use("/api/assigment", assigmentRouter);
app.use("/api/assigmentE", assigmentERouter);
app.use("/api/subject", subjectRouter);
app.use("/api/user", userRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/quarter", quarterRouter);
app.use("/api/infoSubject", infoSubjectRouter);
app.use("/api/request", requestRouter);
app.use("/api/infocareer", infoCareerRouter);

module.exports = app;
