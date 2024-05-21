import { buscarUsuario } from "./apis/APIstudent.js";

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
  const usuario = await buscarUsuario(id);
  const materias = JSON.parse(usuario.data.est.subjects);
  materias.map((i) => {
    const li = document.createElement("li");
    li.textContent = i.name;
    li.id = i.id;
    listadoMaterias.appendChild(li);
  });
});
