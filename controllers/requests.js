const requestRouter = require("express").Router();
const request = require("../model/request");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "pensum");
  },
  filename: function (req, file, cb) {
    const exp = file.originalname.split(".");
    cb(null, file.fieldname + "-" + Date.now() + "." + exp[1]);
  },
});
const upload = multer({ storage });
const fs = require("fs");

requestRouter.get("/listado-filtrado", async (req, res) => {
  const { filter } = req.query;
  try {
    const peticiones = await request.find({ type: filter });
    res.status(200).json(peticiones);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

requestRouter.get("/listado-staff", async (req, res) => {
  try {
    const peticiones = await request.find();
    const listadoFilt = peticiones.filter(
      (i) => i.type !== "4004" && i.type !== "4005"
    );
    res.status(200).json(listadoFilt);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

requestRouter.put("/rechazar-peticion", async (req, res) => {
  const { idReq } = req.body;
  try {
    await request.findOneAndUpdate(
      { id: idReq },
      {
        status: 2,
      }
    );
    res.status(200).json({
      message: "Se ha rechazado la petición",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

requestRouter.put("/aceptar-peticion", async (req, res) => {
  const { idReq } = req.body;
  try {
    await request.findOneAndUpdate(
      { id: idReq },
      {
        status: 0,
      }
    );
    res.status(200).json({
      message: "Petición aceptada",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

requestRouter.post("/cambioDatos", async (req, res) => {
  const { id, data1, data2, data3 } = req.body;
  const objRequest = {
    description: data3.inputDesc,
    dataStudent: data1,
    dataUser: data2,
  };
  const newRequest = new request();
  newRequest.id = Date.now();
  newRequest.idUser = id;
  newRequest.type = "4001";
  newRequest.data = JSON.stringify(objRequest);

  try {
    await newRequest.save();
    res.status(200).json({
      message: "La petición se ha creado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear la petición",
    });
  }
});

requestRouter.post("/contactar", async (req, res) => {
  const newRequest = new request();
  newRequest.id = Date.now();
  newRequest.idUser = "0";
  newRequest.type = "4005";
  newRequest.data = JSON.stringify(req.body);
  try {
    await newRequest.save();
    res.status(200).json({
      message: "La petición se ha creado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear la petición",
    });
  }
});

requestRouter.post("/aplicar", async (req, res) => {
  const { idUser } = req.body;
  const id = Date.now();
  const newRequest = new request();
  newRequest.id = id;
  newRequest.idUser = idUser;
  newRequest.type = "4002";
  try {
    await newRequest.save();
    res.status(200).json({
      message: "Se ha creado la petición con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear la petición",
    });
  }
});

requestRouter.post(
  "/crearMateria",
  upload.single("filePensum"),
  async (req, res) => {
    const trans = JSON.stringify(req.body);
    const obj = JSON.parse(trans);
    obj.path = req.file.path;
    obj.IDquarter = req.query.IDquarter;
    const newRequest = new request();
    newRequest.id = Date.now();
    newRequest.type = "4003";
    newRequest.idUser = req.query.idUser;
    newRequest.data = JSON.stringify(obj);
    try {
      await newRequest.save();
      res.status(200).json({
        message: "Se ha creado la petición con éxito",
      });
    } catch (error) {
      res.status(400).json({
        message: "Hubo un error al crear la petición",
      });
    }
  }
);

requestRouter.delete("/eliminar-peticion", async (req, res) => {
  const { idReq } = req.query;
  if (req.query.data) {
    const datos = JSON.parse(req.query.data);
    fs.unlink(datos.path, (err) => {
      if (err) {
        res.status(400).json({
          message: "Hubo un error al eliminar la petición",
        });
      }
    });
  }
  try {
    await request.findOneAndDelete({ id: idReq });
    res.status(200).json({
      message: "Se ha eliminado la petición",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

module.exports = requestRouter;
