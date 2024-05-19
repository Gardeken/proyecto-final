const assigmentRouter = require("express").Router();
const assigment = require("../model/assigment");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "asignaciones");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage });

module.exports = assigmentRouter;
