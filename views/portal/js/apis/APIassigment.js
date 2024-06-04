export const buscarAsignacion = async (id) => {
  try {
    const asignacion = await axios.get("/api/assigment/buscar-asig", {
      params: {
        id: id,
      },
    });
    return asignacion;
  } catch (error) {
    return error;
  }
};

export const guardarAsignacion = async (data, idUser, idSubject) => {
  try {
    const post = await axios.post("/api/assigment/guardar-asigT", data, {
      params: {
        idUser: idUser,
        idSubject: idSubject,
      },
    });
    return post;
  } catch (error) {
    return error;
  }
};

export const guardarAsignacionEst = async (idAsigE, idAsigT) => {
  try {
    const update = await axios.put("/api/assigment/guardar-asigE", {
      idAsigE: idAsigE,
      idAsigT: idAsigT,
    });
    return update;
  } catch (error) {
    return error;
  }
};

export const actAsigT = async (idAsigE, idAsigT) => {
  try {
    const update = await axios.put("/api/assigment/act-listado-asigE", {
      idAsigT,
      idAsigE,
    });
    return update;
  } catch (error) {
    return error;
  }
};

export const eliminarAsignacionT = async (idAsigT) => {
  const eliminar = await axios.delete("/api/assigment/eliminar-asigT", {
    params: {
      idAsigT,
    },
  });
  return eliminar;
};

export const listadoAsigT = async (idSubject) => {
  const listado = await axios.get("/api/assigment/listado-asignaciones", {
    params: {
      idSubject,
    },
  });
  return listado;
};
