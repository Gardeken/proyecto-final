export const buscarMateria = async (id) => {
  const materia = await axios.get("/api/subject/buscar-materia", {
    params: {
      id: id,
    },
  });

  return materia;
};

export const guardarAsignacionMat = async (idAsig, idSubject) => {
  try {
    const act = await axios.put("/api/subject/guardar-asigT", {
      idAsig: idAsig,
      idSubject: idSubject,
    });
    return act;
  } catch (error) {
    return error;
  }
};
