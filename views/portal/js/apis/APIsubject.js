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

export const listAgregarMaterias = async () => {
  const listado = await axios.get("/api/subject/listado-agregar");
  return listado;
};

export const listAgregarMateriasFilt = async (status, CODCareer) => {
  const consulta = await axios.get("/api/subject/list-agregar-filt", {
    params: {
      status,
      CODCareer,
    },
  });
  return consulta;
};

export const actualizarSubject = async (idStudent, idSubject) => {
  const act = await axios.put("/api/subject/agregar-alumno", {
    idStudent,
    idSubject,
  });
  return act;
};

export const actContador = async (idSubject) => {
  const act = await axios.put("/api/subject/act-contador", {
    idSubject,
  });
  return act;
};

export const actStatusMat = async (idSubject, status) => {
  const act = await axios.put("/api/subject/act-status", {
    idSubject,
    status,
  });
  return act;
};
