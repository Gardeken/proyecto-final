import { buscarEstudiante } from "./apis/APIstudent.js";
import { buscarProfesor } from "./apis/APIteachers.js";
import { buscarMateria } from "./apis/APIsubject.js";
import { buscarUsuario } from "./apis/APIuser.js";
import { buscarAsignacion } from "./apis/APIassigment.js";

const containerMaterias = document.querySelector("#materias");
const listadoMaterias = document.querySelector(".listadoMaterias");
const containerMsg = document.querySelector("#containerMsg");
const message = document.querySelector("#message");
const modal = document.querySelector("#modal");
const containerModal = document.querySelector("#container-modal");
const URL = new URLSearchParams(window.location.search);
const rol = URL.get("rol");
const id = URL.get("id");

containerMaterias.addEventListener("click", (e) => {
  e.preventDefault();
  listadoMaterias.classList.toggle("hidden");
});

function crearMsg(text) {
  containerMsg.classList.add("messageAnimation");
  message.innerHTML = text;

  setTimeout(() => {
    containerMsg.classList.remove("messageAnimation");
  }, 3000);
}

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
      eventosProf(id);
    }
  });
}

function printEst() {
  listadoMaterias.addEventListener("click", async (e) => {
    if (e.target.classList.contains("subject")) {
      const id = e.target.id;
      imprimirContainerEst();
      cargarAsig(id);
      eventosEst(id);
    }
  });
}

async function eventosEst(id) {
  const containerAsig = document.querySelector("#asignaciones");
  containerAsig.addEventListener("click", async (e) => {
    const containerModal = document.querySelector("#container-modal");
    const modal = document.querySelector("#modal");
    if (e.target.parentElement.classList.contains("assigmentS")) {
      const idAsig = e.target.parentElement.id;
      const asig = await buscarAsignacion(idAsig);
      const { name, date, description } = asig.data;

      if (asig.data.path) {
        containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
          <div class="container-nameAsig">
          <p>Nombre:</p>
          <p>${name}</p>
        </div>
        <div class="container-dateAsig">
          <p>Fecha de entrega:</p>
          <p>${date}</p>
        </div>
        <div class="container-descAsig">
          <p>Descripción:</p>
          <p>${description}</p>
        </div>
        <div class="container-download">
          <a href="../${asig.data.path}" download class="download-asig">Descargar</a>
        </div>`;
      } else {
        containerModal.innerHTML = `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          id="closeModal"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="close-modal"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
          <div class="container-nameAsig">
              <p>Nombre:</p>
              <p>${name}</p>
            </div>
            <div class="container-dateAsig">
              <p>Fecha de entrega:</p>
              <p>${date}</p>
            </div>
            <div class="container-descAsig">
              <p>Descripción:</p>
              <p>${description}</p>
            </div>
            `;
      }
      modal.classList.remove("hidden");
      const closeModal = document.querySelector("#closeModal");
      closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
      });
    }
  });
}

async function cargarAsig(id) {
  const materia = await buscarMateria(id);
  const containerM = document.querySelector("#asignaciones");
  const titulo = document.querySelector("#titulo");
  titulo.innerText = "Asignaciones";
  const listadoAsig = JSON.parse(materia.data.assigmentT);
  listadoAsig.forEach(async (i) => {
    const asignacion = await buscarAsignacion(i);
    const { name, date } = asignacion.data;
    const div = document.createElement("div");
    div.classList.add("asignacion", "pointer", "assigmentS");
    div.innerHTML = `
    <p class="column">${name}</p>
    <div class="container-fecha">
      <div class="separador"></div>
      <p class="container-date">${date}</p>
    </div>
  `;
    div.id = i;
    containerM.appendChild(div);
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

function eventosProf(id) {
  const btnAsig = document.querySelector("#asig");
  const btnCalendar = document.querySelector("#calendario");
  const btnEst = document.querySelector("#alumnos");
  btnAsig.addEventListener("click", () => {
    modal.classList.toggle("hidden");
    imprimirCrearAsig();

    const closeModal = document.querySelector("#closeModal");
    flatpickr("#dateAsig", {
      minDate: "today",
    });
    closeModal.addEventListener("click", () => {
      modal.classList.toggle("hidden");
    });
    guardarDatos(id);
  });
}

async function guardarDatos(idSubject) {
  const formulario = document.querySelector("#formulario");
  const aceptar = document.querySelector("#aceptar");
  aceptar.addEventListener("click", async (e) => {
    e.preventDefault();
    const fecha = document.querySelector("#dateAsig").value;
    const name = document.querySelector("#nameAsig").value;
    const desc = document.querySelector("#descAsig").value;
    const listaInput = [fecha, name, desc].some((i) => i === "");

    if (listaInput) {
      return crearMsg("No puede dejar los campos vacíos");
    }

    const data = new FormData(formulario);
    try {
      const post = await axios.post("/api/assigment/guardar-asigT", data, {
        params: {
          idUser: id,
          idSubject: idSubject,
        },
      });
      const act = await axios.put("/api/subject/guardar-asigT", {
        idAsig: post.data.id,
        idSubject: idSubject,
      });
      crearMsg(act.data.message);
      modal.classList.add("hidden");
    } catch (error) {
      crearMsg(error.response.data.message);
    }
  });
}
