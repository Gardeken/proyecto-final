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

const formulario = document.querySelector("#form1");

const inputNombre = document.querySelector("#nombre");
const inputEmail = document.querySelector("#email");
const inputTelf = document.querySelector("#telf");
const message = document.querySelector("#message");

function mostrarAlerta(msg) {
  message.innerHTML = "";
  const alerta = document.createElement("p");
  alerta.textContent = msg;
  message.classList.add("messageAnimation");
  message.appendChild(alerta);

  setTimeout(() => {
    message.classList.remove("messageAnimation");
  }, 3000);
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const listadoInputs = [
    inputNombre.value,
    inputEmail.value,
    inputTelf.value,
  ].some((i) => i === "");

  if (listadoInputs) {
    return mostrarAlerta("No puede dejar los campos vacíos");
  }
});
