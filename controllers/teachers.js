const teacherRouter = require("express").Router();
const teacher = require("../model/teacher");
const user = require("../model/user");
const subject = require("../model/subject");

teacherRouter.get("/buscar-prof", async (req, res) => {
  const { id } = req.query;
  const prof = await teacher.findOne({ id: id });
  if (prof) {
    res.json(prof);
  } else {
    res.status(400).json({ error: "No se ha encontrado el profesor" });
  }
});

module.exports = teacherRouter;
