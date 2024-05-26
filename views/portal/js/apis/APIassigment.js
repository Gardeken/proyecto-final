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
