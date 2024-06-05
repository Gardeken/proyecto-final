export const buscarProfesor = async (id) => {
  const prof = await axios.get("/api/teacher/buscar-prof", {
    params: {
      id: id,
    },
  });
  return prof;
};

export const actMatProf = async (idUser, idSubject, email) => {
  const act = await axios.put("/api/teacher/act-mat-prof", {
    idUser,
    idSubject,
    email,
  });
  return act;
};
