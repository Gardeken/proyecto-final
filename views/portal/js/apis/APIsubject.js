export const buscarMateria = async (id) => {
  const materia = await axios.get("/api/subject/buscar-materia", {
    params: {
      id: id,
    },
  });

  return materia;
};

export const guardarAsignacionMat = async (idAsig, idSubject, porcentaje) => {
  const act = await axios.put("/api/subject/guardar-asigT", {
    idAsig,
    idSubject,
    porcentaje,
  });
  return act;
};

export const createSubject = async (data, idUser, materia, days) => {
  const crear = await axios.post("/api/subject/crear-materia", {
    days,
    materia,
    data,
    idUser,
  });

  const act = await axios.put("/api/quarter/agregar-mat", {
    time: materia.time,
    idSubject: crear.data.idSubject,
    IDQuarter: data.IDquarter,
  });

  return crear;
};

export const actualizarMateria = async (idAsigT, idSubject, porcentaje) => {
  const act = await axios.put("/api/subject/actualizar-list-asigT", {
    idAsigT,
    idSubject,
    porcentaje,
  });
  return act;
};
