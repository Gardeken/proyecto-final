const message = document.querySelector("#message");
const formulario = document.querySelector("#form1");
const inputUsuario = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");

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
  const listadoInputs = [inputUsuario.value, inputPassword.value].some(
    (i) => i === ""
  );

  if (listadoInputs) {
    return mostrarAlerta("No puede dejar los campos vacíos");
  }
});
