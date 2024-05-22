import { buscarEstudiante, buscarProfesor } from "./apis/APIstudent.js";

const containerMaterias = document.querySelector("#materias");
const listadoMaterias = document.querySelector(".listadoMaterias");
const URL = new URLSearchParams(window.location.search);
const rol = URL.get("rol");
const id = URL.get("id");

containerMaterias.addEventListener("click", (e) => {
  e.preventDefault();
  listadoMaterias.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", async () => {
  if (rol === "student") {
    const usuario = await buscarEstudiante(id);
    return impListadoMat(usuario.data.est.subjects);
  }
  if (rol === "teacher") {
    const prof = await buscarProfesor(id);
    return impListadoMat(prof.data.subjects);
  }
});

async function impListadoMat(list) {
  const listado = JSON.parse(list);

  listado.map((i) => {
    const li = document.createElement("li");
    li.textContent = i.name;
    li.id = i.id;
    listadoMaterias.appendChild(li);
  });
}
