const subjectRouter = require("express").Router();
const subject = require("../model/subject");

subjectRouter.get("/buscar-materia", async (req, res) => {
  const { id } = req.query;
  const materia = await subject.findOne({ id: id });
  if (materia) {
    res.status(200).json(materia);
  } else {
    res.status(404).json({ message: "No se encontró la materia" });
  }
});

subjectRouter.get("/listado-agregar", async (req, res) => {
  try {
    const listado = await subject.find({ status: 3 });
    res.status(200).json(listado);
  } catch (error) {
    res.status(404).json({
      message: "No se encontraron materias",
    });
  }
});

subjectRouter.get("/list-agregar-filt", async (req, res) => {
  const { status, CODCareer } = req.query;
  const listado = await subject.find({
    status: Number(status),
    CODCareer: CODCareer,
  });
  res.status(200).json(listado);
});

subjectRouter.put("/guardar-asigT", async (req, res) => {
  const { idAsig, idSubject, porcentaje } = req.body;
  try {
    const materia = await subject.findOne({ id: idSubject });
    let total = 0;
    if (materia.porcentaje) {
      total += Number(materia.porcentaje) + Number(porcentaje);
    } else {
      total += Number(porcentaje);
    }
    console.log(total);
    const lista = [idAsig.toString()];
    if (materia.assigmentT) {
      let listadoAsig = JSON.parse(materia.assigmentT);
      listadoAsig.push(idAsig.toString());
      await subject.findOneAndUpdate(
        { id: idSubject },
        {
          assigmentT: JSON.stringify(listadoAsig),
          porcentaje: total,
        }
      );
    } else {
      await subject.findOneAndUpdate(
        { id: idSubject },
        {
          assigmentT: JSON.stringify(lista),
          porcentaje: total,
        }
      );
    }
    res.status(200).json({ message: "Se ha creado con éxito la asignación" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "No se pudo guardar la asignación",
    });
  }
});

subjectRouter.put("/agregar-alumno", async (req, res) => {
  const { idStudent, idSubject } = req.body;
  const consulta = await subject.findOne({ id: idSubject });
  const lista = [idStudent.toString()];
  const cuposRes = consulta.cupos - 1;
  if (cuposRes < 0) {
    await subject.findOneAndUpdate(
      { id: idSubject },
      {
        status: 2,
      }
    );
    res.status(400).json({
      message: "Ya no quedan cupos",
    });
  } else {
    try {
      if (consulta.students) {
        const listado = JSON.parse(consulta.students);
        listado.push(idStudent.toString());
        await subject.findOneAndUpdate(
          { id: idSubject },
          { students: JSON.stringify(listado), cupos: cuposRes }
        );
        res.status(200).json({
          deuda: consulta.price,
          CODSubject: consulta.CODSubject,
          message: "Materia agregada con éxito",
        });
      } else {
        await subject.findOneAndUpdate(
          { id: idSubject },
          { students: JSON.stringify(lista), cupos: cuposRes }
        );
        res.status(200).json({
          deuda: consulta.price,
          CODSubject: consulta.CODSubject,
          message: "Materia agregada con éxito",
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Hubo un error al agregar la materia",
      });
    }
  }
});

subjectRouter.put("/actualizar-list-asigT", async (req, res) => {
  const { idAsigT, idSubject, porcentaje } = req.body;

  try {
    const consulta = await subject.findOne({ id: idSubject });
    let listado = JSON.parse(consulta.assigmentT);
    const total = consulta.porcentaje - porcentaje;
    listado = listado.filter((i) => i !== idAsigT);
    await subject.findOneAndUpdate(
      { id: idSubject },
      {
        porcentaje: total,
        assigmentT: JSON.stringify(listado),
      }
    );
    res.status(200).json({
      message: "Se ha eliminado la asignación",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al eliminar la asignación",
    });
  }
});

subjectRouter.post("/crear-materia", async (req, res) => {
  const { materia, data, idUser, days } = req.body;
  const newSubject = new subject();
  const fechas = {
    days,
    startClass: data.startClass,
    endClass: data.endClass,
  };
  const idSubject = Date.now();
  newSubject.name = materia.name;
  newSubject.id = idSubject;
  newSubject.teacher = idUser;
  newSubject.CODSubject = materia.CODSubject;
  newSubject.status = 3;
  newSubject.price = Number(materia.price);
  newSubject.cupos = materia.cupos;
  newSubject.CODFaculty = materia.CODFaculty;
  newSubject.dates = JSON.stringify(fechas);
  if (materia.time === 6) {
    newSubject.quarterCount = 1;
  }
  if (materia.CODCareer) {
    newSubject.CODCareer = materia.CODCareer;
  }
  try {
    await newSubject.save();
    res.status(200).json({
      idSubject,
      message: "La materia se ha creado con éxito",
    });
  } catch (error) {
    res.status(400).json({
      message: "Hubo un error al crear la materia",
    });
  }
});

module.exports = subjectRouter;
