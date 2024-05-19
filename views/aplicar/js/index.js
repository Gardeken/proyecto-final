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

// guardando archivos

const formulario = document.querySelector("#formulario");
const tituloImg = document.querySelector("#tituloImg");

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  axios.post("/api/assigment/guardar-archivos", {
    tituloImg: tituloImg,
  });
});
