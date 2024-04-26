const action_list1 = document.querySelector("#action-list1"),
  list1 = document.querySelector("#list1"),
  list2 = document.querySelector("#list2"),
  arrow1 = document.querySelector("#arrow"),
  inicio = document.querySelector("#inicio"),
  event2 = document.querySelector("#event2"),
  event3 = document.querySelector("#event3"),
  lateral = document.querySelector("#lateral"),
  btn_portal1 = document.querySelector("#btn-portal1"),
  btn_inicio1 = document.querySelector("#btn-inicio1"),
  btn_inicio2 = document.querySelector("#btn-inicio2"),
  btn_portal2 = document.querySelector("#btn-portal2"),
  container1 = document.querySelector(".container-main-1"),
  container2 = document.querySelector(".container-main-2"),
  btn_close = document.querySelector("#close");

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
  lateral.classList.toggle("lateral-animation");
});

//cerrar barra lateral

btn_close.addEventListener("click", () => {
  lateral.classList.toggle("lateral-animation");
});

//Mover el inicio

btn_inicio1.addEventListener("click", (e) => {
  e.preventDefault();
  container1.classList.remove("main1-animation");
  container2.classList.remove("main2-animation");
  btn_portal1.classList.remove("color-sec");
  btn_inicio1.classList.add("color-sec");
  btn_portal2.classList.remove("color-sec");
  btn_inicio2.classList.add("color-sec");
});

//Mover el inicio responsive

btn_inicio2.addEventListener("click", (e) => {
  container1.classList.remove("main1-animation");
  container2.classList.remove("main2-animation");
  btn_portal2.classList.remove("color-sec");
  btn_inicio2.classList.add("color-sec");
  btn_portal1.classList.remove("color-sec");
  btn_inicio1.classList.add("color-sec");
});

//Mover el portal

btn_portal1.addEventListener("click", (e) => {
  e.preventDefault();
  container1.classList.add("main1-animation");
  container2.classList.add("main2-animation");
  btn_portal1.classList.add("color-sec");
  btn_inicio1.classList.remove("color-sec");
  btn_portal2.classList.add("color-sec");
  btn_inicio2.classList.remove("color-sec");
});

//Mover el portal responsive

btn_portal2.addEventListener("click", (e) => {
  container1.classList.add("main1-animation");
  container2.classList.add("main2-animation");
  btn_portal2.classList.add("color-sec");
  btn_inicio2.classList.remove("color-sec");
  btn_portal1.classList.add("color-sec");
  btn_inicio1.classList.remove("color-sec");
});
