export const buscarEstudiante = async (id) => {
  const student = await axios.get("/api/student/buscar-est", {
    params: {
      id: id,
    },
  });
  return student;
};

export const aceptarAlumno = async (idStudent) => {
  const student = await axios.put("/api/student/aceptar-al", { idStudent });
  return student;
};

export const actAlumno = async (id, data, data2) => {
  const actEst = await axios.put("/api/student/act-alumno", data, {
    params: {
      id,
    },
  });

  const actUser = await axios.put("/api/user/act-user", data2, {
    params: {
      id,
    },
  });

  return actUser;
};
