import { listadoCarreras } from "./listadoCarreras.js";

const action_list1 = document.querySelector("#action-list1"),
  list1 = document.querySelector("#list1"),
  list2 = document.querySelector("#list2"),
  arrow1 = document.querySelector("#arrow"),
  inicio = document.querySelector("#inicio"),
  event2 = document.querySelector("#event2"),
  event3 = document.querySelector("#event3"),
  lateral = document.querySelector("#lateral"),
  btn_close = document.querySelector("#close"),
  bg = document.querySelector(".bg");

// mostrar primer listado

inicio.addEventListener("click", (e) => {
  evento1(e);
});

function evento1(e) {
  if (e.target.id === "action-list1") {
    action_list1.classList.toggle("color-sec");
    list1.classList.toggle("display");
  } else {
    action_list1.classList.remove("color-sec");
    list1.classList.remove("display");
  }
}

//animacion mostrar listado en barra lateral

event2.addEventListener("click", () => {
  list2.classList.toggle("show");
  arrow1.classList.toggle("arrow-animation");
});

//animacion barra lateral

event3.addEventListener("click", () => {
  bg.classList.toggle("show");
  lateral.classList.toggle("lateral-animation");
});

//cerrar barra lateral

btn_close.addEventListener("click", () => {
  bg.classList.toggle("show");
  lateral.classList.toggle("lateral-animation");
});

// funcionalidades de la pagina

const containerRes = document.querySelector("#resultado");
const URL = new URLSearchParams(window.location.search);
const busqueda = URL.get("carrera");
const busqueda2 = URL.get("id");
const listadoDiplomados = listadoCarreras.Diplomados;
const listadoTec = listadoCarreras["Ténico Sup"];
const listadoPost = listadoCarreras["Post Grados"];
const listadoLic = listadoCarreras.Licenciaturas;
document.addEventListener("DOMContentLoaded", validarCarrera);

function imprimirDiplomados() {
  const titulo = document.createElement("h1");

  titulo.textContent = listadoDiplomados[0].titulo;

  const container = document.createElement("div");

  for (let i = 1; i < listadoDiplomados.length; i++) {
    const diplomado = listadoDiplomados[i];
    const subtitulo = document.createElement("a");
    const resumen = document.createElement("p");
    const containerText = document.createElement("div");

    subtitulo.href = `/carreras/?id=${diplomado.id}`;

    subtitulo.innerText = diplomado.titulo;
    resumen.innerText = diplomado.resumen;

    containerText.appendChild(subtitulo);
    containerText.appendChild(resumen);
    containerText.classList.add("container-texto");
    container.appendChild(containerText);
  }
  containerRes.appendChild(container);
}

function imprimirLicenciaturas() {
  listadoLic.forEach((i) => {
    const containerText = document.createElement("div");
    const titulo = document.createElement("h3");
    const resumen = document.createElement("p");

    titulo.innerText = i.facultad;
    resumen.innerText = i.resumen;

    containerText.appendChild(titulo);
    containerText.appendChild(resumen);

    const listadoCarreras = i.carrera;
    listadoCarreras.forEach((carrera) => {
      const subtitulo = document.createElement("a");
      const resumen = document.createElement("p");
      subtitulo.href = `/carreras/?id=${carrera.id}`;
      subtitulo.innerText = carrera.titulo;
      resumen.innerText = carrera.resumen;
      containerText.appendChild(subtitulo);
      containerText.appendChild(resumen);
      containerText.classList.add("container-texto");
      containerRes.appendChild(containerText);
    });
  });
}

function imprimirTecnicos() {
  const container = document.createElement("div");

  for (let i = 0; i < listadoTec.length; i++) {
    const Tecnico = listadoTec[i];

    const titulo = document.createElement("h3");
    const subtitulo = document.createElement("a");
    const resumen = document.createElement("p");
    const containerText = document.createElement("div");

    containerText.classList.add("container-texto");
    titulo.innerText = Tecnico.facultad;

    if (Tecnico.carrera.length <= 10) {
      const listado = Tecnico.carrera;
      listado.forEach((i) => {
        const subtitulo2 = document.createElement("a");
        const resumen2 = document.createElement("p");
        const containerText2 = document.createElement("div");

        subtitulo2.innerText = i.titulo;
        resumen2.innerText = i.resumen;
        containerText2.appendChild(subtitulo2);
        containerText2.appendChild(resumen2);

        subtitulo2.href = `/carreras/?id=${i.id}`;

        containerText2.classList.add("container-texto");
        containerRes.appendChild(containerText2);
      });
    } else {
      subtitulo.innerText = Tecnico.carrera;
      resumen.innerText = Tecnico.resumen;
      containerText.appendChild(subtitulo);
      containerText.appendChild(resumen);

      subtitulo.href = `/carreras/?id=${Tecnico.id}`;
    }

    containerRes.appendChild(containerText);
  }

  containerRes.appendChild(container);
}

function imprimirPost() {
  listadoPost.forEach((i) => {
    const containerText = document.createElement("div");
    const titulo = document.createElement("h3");

    titulo.innerText = i.facultad;

    containerText.appendChild(titulo);

    const listadoCarreras = i.carrera;
    listadoCarreras.forEach((carrera) => {
      const subtitulo = document.createElement("a");
      const resumen = document.createElement("p");
      subtitulo.href = `/carreras/?id=${carrera.id}`;
      subtitulo.innerText = carrera.titulo;
      resumen.innerText = carrera.resumen;
      containerText.appendChild(subtitulo);
      containerText.appendChild(resumen);
      containerText.classList.add("container-texto");
      containerRes.appendChild(containerText);
    });
  });
}

function imprimirTexto() {
  const containerText = document.createElement("div");
  const titulo = document.createElement("h2");
  const texto = document.createElement("p");

  containerText.classList.add("container-texto-2");

  for (let i = 1; i < listadoDiplomados.length; i++) {
    const diplomado = listadoDiplomados[i];
    if (parseInt(busqueda2) === diplomado.id) {
      titulo.innerText = diplomado.titulo;
      texto.innerText = diplomado.texto;
    }
    containerText.appendChild(titulo);
    containerText.appendChild(texto);
    containerText.classList.add("container-texto");
    containerRes.appendChild(containerText);
  }

  for (let i = 0; i < listadoTec.length; i++) {
    const Tecnico1 = listadoTec[i];
    const Tecnico2 = Tecnico1.carrera;
    if (parseInt(busqueda2) === Tecnico1.id) {
      titulo.innerText = Tecnico1.carrera;
      texto.innerText = Tecnico1.texto;
      containerText.appendChild(titulo);
      containerText.appendChild(texto);
      containerRes.appendChild(containerText);
    } else {
      for (let i = 0; i < Tecnico2.length; i++) {
        const carreras2 = Tecnico2[i];
        if (parseInt(busqueda2) === carreras2.id) {
          titulo.innerText = carreras2.titulo;
          texto.innerText = carreras2.texto;
          containerText.appendChild(titulo);
          containerText.appendChild(texto);
          containerRes.appendChild(containerText);
        }
      }
    }
  }

  for (let i = 0; i < listadoLic.length; i++) {
    const listado = listadoLic[i];
    const listadoCarreras = listado.carrera;
    listadoCarreras.forEach((i) => {
      if (i.id === parseInt(busqueda2)) {
        titulo.innerText = i.titulo;
        texto.innerText = i.texto;
        containerText.appendChild(titulo);
        containerText.appendChild(texto);
        containerRes.appendChild(containerText);
      }
    });
  }

  for (let i = 0; i < listadoPost.length; i++) {
    const listado = listadoPost[i];
    const listadoCarreras = listado.carrera;
    listadoCarreras.forEach((i) => {
      if (i.id === parseInt(busqueda2)) {
        titulo.innerText = i.titulo;
        texto.innerText = i.texto;
        containerText.appendChild(titulo);
        containerText.appendChild(texto);
        containerRes.appendChild(containerText);
      }
    });
  }
}

function validarCarrera() {
  if (busqueda2) {
    return imprimirTexto();
  }

  if (busqueda === "Licenciaturas") {
    return imprimirLicenciaturas();
  }

  if (busqueda === "Tecnico") {
    return imprimirTecnicos();
  }

  if (busqueda === "Diplomado") {
    return imprimirDiplomados();
  }

  if (busqueda === "Post") {
    return imprimirPost();
  }
}
