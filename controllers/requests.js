const requestRouter = require("express").Router();
const request = require("../model/request");

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

requestRouter.delete("/eliminar-peticion", async (req, res) => {
  const { idReq } = req.query;
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
