import { buscarEstudiante } from "./apis/APIstudent.js";
import { buscarProfesor } from "./apis/APIteachers.js";
import { buscarMateria } from "./apis/APIsubject.js";
import { buscarUsuario } from "./apis/APIuser.js";

const containerMaterias = document.querySelector("#materias");
const listadoMaterias = document.querySelector(".listadoMaterias");
const modal = document.querySelector("#modal");
const containerModal = document.querySelector("#container-modal");
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
    printEst();
    return impListadoMat(usuario.data.subjects);
  }
  if (rol === "teacher") {
    const prof = await buscarProfesor(id);
    printProf();
    return impListadoMat(prof.data.subjects);
  }
});

async function impListadoMat(list) {
  const listado = JSON.parse(list);
  listado.map(async (i) => {
    const materia = await buscarMateria(i);
    const li = document.createElement("li");
    li.textContent = materia.data.name;
    li.classList.add("subject");
    li.id = i;
    listadoMaterias.appendChild(li);
  });
}

function printProf() {
  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerProf();
      consultaEst(id);
      eventos(id);
    }
  });
}

function printEst() {
  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerEst();
    }
  });
}

async function consultaEst(id) {
  const containerM = document.querySelector("#asignaciones");
  const titulo = document.querySelector("#titulo");
  titulo.innerText = "Alumnos";
  const materia = await buscarMateria(id);
  const listadoEst = JSON.parse(materia.data.students);
  listadoEst.forEach(async (i) => {
    const student = await buscarUsuario(i);
    const namestudent = await buscarEstudiante(i);
    const email = student.data.email;
    const name = namestudent.data.fullName;
    const div = document.createElement("div");
    div.classList.add("asignacion");
    div.innerHTML = `
    <p class="column">${name}</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">email: ${email}</p>
    </div>
  `;
    containerM.appendChild(div);
  });
}

function eventos(id) {
  const btnAsig = document.querySelector("#asig");
  const btnCalendar = document.querySelector("#calendario");
  const btnEst = document.querySelector("#alumnos");
  btnAsig.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    imprimirCrearAsig();
  });
}
