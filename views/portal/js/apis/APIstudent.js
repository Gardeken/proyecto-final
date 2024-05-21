export const buscarUsuario = async (id) => {
  const student = await axios.get("/api/student/buscar-est", {
    params: {
      id: id,
    },
  });
  return student;
};
