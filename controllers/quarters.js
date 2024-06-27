const quarterRouter = require("express").Router();
const quarter = require("../model/quarter");

quarterRouter.post("/guardar-trimestre", async (req, res) => {
  const {
    startDate,
    endDate,
    IDquarter,
    inscDate,
    createDate,
    endinscDate,
    endcreateDate,
  } = req.body;
  const consulta = await quarter.findOne({ quarter: IDquarter, status: 3 });
  if (consulta) {
    return res.status(400).json({
      message: "No se pueden agregar más modulos de este tipo",
    });
  }
  try {
    let newQuarter = new quarter();
    newQuarter.quarter = IDquarter;
    newQuarter.startDate = startDate;
    newQuarter.endDate = endDate;
    newQuarter.id = Date.now();
    newQuarter.startinscDate = inscDate;
    newQuarter.endinscDate = endinscDate;
    newQuarter.startcreateDate = createDate;
    newQuarter.endcreateDate = endcreateDate;
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

quarterRouter.get("/listado-modulos-aplicar", async (req, res) => {
  try {
    const listadoModulos = await quarter.find({ status: 2 });
    res.status(200).json(listadoModulos);
  } catch (error) {
    console.log(error);
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
    const fechaFin = trimestreActual.endDate.split("-");
    const diaActual = new Date().getDate();
    const mesActual = new Date().getMonth() + 1;
    const añoActual = new Date().getFullYear();
    if (
      Number(fechaFin[0]) <= diaActual &&
      Number(fechaFin[1]) <= mesActual &&
      Number(fechaFin[2]) <= añoActual
    ) {
      await quarter.findOneAndUpdate(
        { status: trimestreActual.status },
        {
          status: 0,
        }
      );
      if (Number(trimestreActual.quarter) === 101) {
        const consulta1 = await quarter.findOne({ quarter: "102", status: 3 });
        if (consulta1) {
          const fechaInicio = consulta1.startDate.split("-");
          if (
            fechaInicio[0] <= diaActual &&
            fechaInicio[1] <= mesActual &&
            fechaInicio[2] <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "102", status: 3 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta1.subjects3,
              subjects6: consulta1.subjects6,
              idQuarter: consulta1.id,
              subjects6Act: trimestreActual.subjects6,
              cambio: true,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            await quarter.findOneAndUpdate(
              { quarter: "102", status: 3 },
              {
                status: 2,
              }
            );
            res.status(200).json({
              message: "Se ha cambiado de trimestre",
            });
          }
        } else {
          const consulta2 = await quarter.findOne({
            quarter: "102",
            status: 2,
          });
          const fechaInicio = consulta2.startDate.split("-");
          if (
            Number(fechaInicio[0]) <= diaActual &&
            Number(fechaInicio[1]) <= mesActual &&
            Number(fechaInicio[2]) <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "102", status: 2 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta2.subjects3,
              subjects6: consulta2.subjects6,
              subjects6Act: trimestreActual.subjects6,
              idQuarter: consulta2.id,
              cambio: true,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            res.status(200).json({
              message: "No se ha actualizado el trimestre",
            });
          }
        }
      } else if (Number(trimestreActual.quarter) === 102) {
        const consulta1 = await quarter.findOne({ quarter: "103", status: 3 });
        if (consulta1) {
          const fechaInicio = consulta1.startDate.split("-");
          if (
            fechaInicio[0] <= diaActual &&
            fechaInicio[1] <= mesActual &&
            fechaInicio[2] <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "103", status: 3 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta1.subjects3,
              subjects6: consulta1.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            await quarter.findOneAndUpdate(
              { quarter: "103", status: 3 },
              {
                status: 2,
              }
            );
            res.status(200).json({
              message: "Se ha cambiado de trimestre",
            });
          }
        } else {
          const consulta2 = await quarter.findOne({
            quarter: "103",
            status: 2,
          });
          const fechaInicio = consulta2.startDate.split("-");
          if (
            Number(fechaInicio[0]) <= diaActual &&
            Number(fechaInicio[1]) <= mesActual &&
            Number(fechaInicio[2]) <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "103", status: 2 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta2.subjects3,
              subjects6: consulta2.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            res.status(200).json({
              message: "No se ha actualizado el trimestre",
            });
          }
        }
      } else if (Number(trimestreActual.quarter) === 103) {
        const consulta1 = await quarter.findOne({ quarter: "104", status: 3 });
        if (consulta1) {
          const fechaInicio = consulta1.startDate.split("-");
          if (
            fechaInicio[0] <= diaActual &&
            fechaInicio[1] <= mesActual &&
            fechaInicio[2] <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "104", status: 3 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta1.subjects3,
              subjects6: consulta1.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            await quarter.findOneAndUpdate(
              { quarter: "104", status: 3 },
              {
                status: 2,
              }
            );
            res.status(200).json({
              message: "Se ha cambiado de trimestre",
            });
          }
        } else {
          const consulta2 = await quarter.findOne({
            quarter: "104",
            status: 2,
          });
          const fechaInicio = consulta2.startDate.split("-");
          if (
            Number(fechaInicio[0]) <= diaActual &&
            Number(fechaInicio[1]) <= mesActual &&
            Number(fechaInicio[2]) <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "104", status: 2 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta2.subjects3,
              subjects6: consulta2.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            res.status(200).json({
              message: "No se ha actualizado el trimestre",
            });
          }
        }
      } else if (Number(trimestreActual.quarter) === 104) {
        const consulta1 = await quarter.findOne({ quarter: "101", status: 3 });
        if (consulta1) {
          const fechaInicio = consulta1.startDate.split("-");
          if (
            fechaInicio[0] <= diaActual &&
            fechaInicio[1] <= mesActual &&
            fechaInicio[2] <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "101", status: 3 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta1.subjects3,
              subjects6: consulta1.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            await quarter.findOneAndUpdate(
              { quarter: "101", status: 3 },
              {
                status: 2,
              }
            );
            res.status(200).json({
              message: "Se ha cambiado de trimestre",
            });
          }
        } else {
          const consulta2 = await quarter.findOne({
            quarter: "101",
            status: 2,
          });
          const fechaInicio = consulta2.startDate.split("-");
          if (
            Number(fechaInicio[0]) <= diaActual &&
            Number(fechaInicio[1]) <= mesActual &&
            Number(fechaInicio[2]) <= añoActual
          ) {
            await quarter.findOneAndUpdate(
              { quarter: "101", status: 2 },
              {
                status: 1,
              }
            );
            res.status(200).json({
              subjects3: consulta2.subjects3,
              subjects6: consulta2.subjects6,
              message: "Se ha cambiado de trimestre",
            });
          } else {
            res.status(200).json({
              message: "No se ha actualizado el trimestre",
            });
          }
        }
      }
    }
  } catch (error) {
    res.status(200).json({
      message: "No se ha actualizado el trimestre",
    });
  }
});

quarterRouter.get("/validar-create-prof", async (req, res) => {
  const trimestreActual = await quarter.findOne({ status: 1 });

  if (trimestreActual.quarter === "101") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "102" });
    const fechaCreacion = trimestreSig.startcreateDate.split("-");
    const fechaEndCreacion = trimestreSig.endcreateDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "102") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "103" });
    const fechaCreacion = trimestreSig.startcreateDate.split("-");
    const fechaEndCreacion = trimestreSig.endcreateDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "103") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "104" });
    const fechaCreacion = trimestreSig.startcreateDate.split("-");
    const fechaEndCreacion = trimestreSig.endcreateDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "104") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "101" });
    const fechaCreacion = trimestreSig.startcreateDate.split("-");
    const fechaEndCreacion = trimestreSig.endcreateDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
});

quarterRouter.get("/buscar-trimestre", async (req, res) => {
  const { idQuarter } = req.query;
  const trimestre = await quarter.findOne({ id: idQuarter });
  res.status(200).json(trimestre);
});

quarterRouter.get("/validar-insc-al", async (req, res) => {
  const trimestreActual = await quarter.findOne({ status: 1 });

  if (trimestreActual.quarter === "101") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "102" });
    const fechaCreacion = trimestreSig.startinscDate.split("-");
    const fechaEndCreacion = trimestreSig.endinscDate.split("-");
    const mesActual = new Date().getMonth() + 1;

    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "102") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "103" });
    const fechaCreacion = trimestreSig.startinscDate.split("-");
    const fechaEndCreacion = trimestreSig.endinscDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "103") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "104" });
    const fechaCreacion = trimestreSig.startinscDate.split("-");
    const fechaEndCreacion = trimestreSig.endinscDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
  if (trimestreActual.quarter === "104") {
    const trimestreSig = await quarter.findOne({ status: 3, quarter: "101" });
    const fechaCreacion = trimestreSig.startinscDate.split("-");
    const fechaEndCreacion = trimestreSig.endinscDate.split("-");
    const mesActual = new Date().getMonth() + 1;
    if (
      mesActual < fechaCreacion[1] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      mesActual == fechaCreacion[1] &&
      new Date().getDate() < fechaCreacion[0] &&
      fechaCreacion[2] >= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else if (
      fechaEndCreacion[0] <= new Date().getDate() &&
      fechaEndCreacion[1] <= mesActual &&
      fechaEndCreacion[2] <= new Date().getFullYear()
    ) {
      res.status(400).json({
        message: "Aún no es fecha de creación",
      });
    } else {
      res.status(200).json({
        IDquarter: trimestreSig.id,
        message: "Es fecha de creación",
      });
    }
  }
});

quarterRouter.put("/agregar-mat", async (req, res) => {
  const { time, idSubject, IDQuarter } = req.body;
  const lista = [`${idSubject}`];
  try {
    const consulta = await quarter.findOne({ id: IDQuarter });
    if (time === 6) {
      if (consulta.subjects6) {
        const listado = JSON.parse(consulta.subjects6);
        listado.push(idSubject.toString());
        await quarter.findOneAndUpdate(
          { id: IDQuarter },
          {
            subjects6: JSON.stringify(listado),
          }
        );
        res.status(200).json({
          message: "Se ha creado la materia con éxito",
        });
      } else {
        await quarter.findOneAndUpdate(
          { id: IDQuarter },
          {
            subjects6: JSON.stringify(lista),
          }
        );
        res.status(200).json({
          message: "Se ha creado la materia con éxito",
        });
      }
    } else {
      if (consulta.subjects3) {
        const listado = JSON.parse(consulta.subjects3);
        listado.push(idSubject);
        await quarter.findOneAndUpdate(
          { id: IDQuarter },
          {
            subjects3: JSON.stringify(listado),
          }
        );
        res.status(200).json({
          message: "Se ha creado la materia con éxito",
        });
      } else {
        await quarter.findOneAndUpdate(
          { id: IDQuarter },
          {
            subjects3: JSON.stringify(lista),
          }
        );
        res.status(200).json({
          message: "Se ha creado la materia con éxito",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Hubo un error inesperado",
    });
  }
});

quarterRouter.delete("/eliminar-trimestre", async (req, res) => {
  const { id } = req.query;
  try {
    const consulta = await quarter.findOne({ id });
    if (consulta.subjects3 || consulta.subjects6) {
      res.status(400).json({
        message: "Este trimestre ya no se puede eliminar",
      });
    }
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
