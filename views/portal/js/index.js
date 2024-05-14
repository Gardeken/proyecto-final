const containerMaterias = document.querySelector("#materias");
const llistadoMaterias = document.querySelector(".listadoMaterias");

containerMaterias.addEventListener("click", (e) => {
  e.preventDefault();
  llistadoMaterias.classList.toggle("hidden");
});
