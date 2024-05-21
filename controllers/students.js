const studentRouter = require("express").Router();
const student = require("../model/student");
const subject = require("../model/subject");
const user = require("../model/user");

studentRouter.get("/buscar-est", async (req, res) => {
  const { id } = req.query;
  const estudiante = await student.findOne({ id: id });
  if (estudiante) {
    res.status(200).json({
      est: estudiante,
    });
  } else {
    res.status(400).json({
      error: "No se encontro el estudiante",
    });
  }
});

module.exports = studentRouter;
