export const buscarEstudiante = async (id) => {
  const student = await axios.get("/api/student/buscar-est", {
    params: {
      id: id,
    },
  });
  return student;
};

export const buscarProfesor = async (id) => {
  const prof = await axios.get("/api/teacher/buscar-prof", {
    params: {
      id: id,
    },
  });
  return prof;
};
