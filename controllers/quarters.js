const quarterRouter = require("express").Router();
const quarter = require("../model/quarter");

quarterRouter.post("/guardar-trimestre", async (req, res) => {
  const { startDate, endDate, IDquarter } = req.body;
  try {
    let newQuarter = new quarter();
    newQuarter.quarter = IDquarter;
    newQuarter.startDate = startDate;
    newQuarter.endDate = endDate;
    newQuarter.id = Date.now();
    const savedQuarter = await newQuarter.save();
    res.status(200).json({
      message: "El trimestre se ha creado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear el trimestre",
    });
  }
});

quarterRouter.get("/listado-trimestres", async (req, res) => {
  try {
    const listado = await quarter.find();
    res.status(200).json(listado);
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

quarterRouter.get("/actualizar-trimestre", async (req, res) => {
  try {
    const trimestreActual = await quarter.findOne({ status: 1 });
    const fechaIni = trimestreActual.startDate.split("-");
    const fechaFin = trimestreActual.endDate.split("-");
    const diaActual = new Date().getDate();
    const mesActual = new Date().getMonth() + 1;
    const añoActual = new Date().getFullYear();
    if (
      Number(fechaFin[0]) === diaActual &&
      Number(fechaFin[1]) === mesActual &&
      Number(fechaFin[2]) === añoActual
    ) {
      await quarter.findOneAndUpdate(
        { status: trimestreActual.status },
        {
          status: 0,
        }
      );

      if (Number(trimestreActual.quarter) === 101) {
        await quarter.findOneAndUpdate(
          { quarter: "102", status: 2 },
          {
            status: 1,
          }
        );
      } else if (Number(trimestreActual.quarter) === 102) {
        await quarter.findOneAndUpdate(
          { quarter: "103", status: 2 },
          {
            status: 1,
          }
        );
      } else if (Number(trimestreActual.quarter) === 103) {
        await quarter.findOneAndUpdate(
          { quarter: "104", status: 2 },
          {
            status: 1,
          }
        );
      } else if (Number(trimestreActual.quarter) === 104) {
        await quarter.findOneAndUpdate(
          { quarter: "101", status: 2 },
          {
            status: 1,
          }
        );
      }
      res.status(200).json({
        message: "Se ha cambiado de trimestre",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

quarterRouter.delete("/eliminar-trimestre", async (req, res) => {
  const { id } = req.query;
  try {
    await quarter.findOneAndDelete({ id });
    res.status(200).json({
      message: "Se ha eliminado el trimestre con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al eliminar el trimestre",
    });
  }
});

module.exports = quarterRouter;
