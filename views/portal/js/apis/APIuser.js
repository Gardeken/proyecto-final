export const buscarUsuario = async (id) => {
  const usuario = axios.get("/api/user/buscar-usuario", {
    params: {
      id: id,
    },
  });
  return usuario;
};
