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

export const guardarAsignacionEstudiante = async (data, idUser, idAsigT) => {
  const post = axios.post("/api/assigmentE/guardar-asigE", data, {
    params: {
      idUser: idUser,
      idAsigT: idAsigT,
    },
  });
  return post;
};
