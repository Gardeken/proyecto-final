export const buscarAsignacionE = async (id) => {
  const asignacion = await axios.get("/api/assigmentE/buscar-asigE", {
    params: {
      id: id,
    },
  });
  return asignacion;
};

export const listadoAsignaciones = async (idAsigT) => {
  const listado = await axios.get("/api/assigmentE/buscar-listado", {
    params: {
      idAsigT: idAsigT,
    },
  });
  return listado;
};

export const buscarUnaAsig = async (idUser, idAsigT) => {
  const asig = await axios.get("/api/assigmentE/buscar-una-asig", {
    params: {
      idAsigT: idAsigT,
      idUser: idUser,
    },
  });
  return asig;
};

export const guardarAsignacionEstudiante = async (
  data,
  idSubject,
  idUser,
  idAsigT
) => {
  const post = axios.post("/api/assigmentE/guardar-asigE", data, {
    params: {
      idSubject: idSubject,
      idUser: idUser,
      idAsigT: idAsigT,
    },
  });
  return post;
};

export const corregirAsig = async (idAsig, grade) => {
  const act = await axios.put("/api/assigmentE/guardar-nota", {
    idAsig: idAsig,
    grade: grade,
  });

  return act;
};

export const eliminarAsig = async (idAsig, path) => {
  const eliminar = await axios.delete("/api/assigmentE/eliminar-asig", {
    params: {
      path: path,
      idAsig: idAsig,
    },
  });

  return eliminar;
};

export const listadoAsigEst = async (idUser, idSubject) => {
  const consulta = await axios.get("/api/assigmentE/listado-asig-est", {
    params: {
      idUser: idUser,
      idSubject: idSubject,
    },
  });
  return consulta;
};
