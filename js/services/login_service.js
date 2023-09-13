import { Login, Logout } from "./sesion_manager.js";

const btn_close = document.getElementById("btn-close");
const btn_login = document.getElementById("btn-login");
const btn_logout = document.getElementById("btn-logout");

const inputs = document.querySelectorAll("input");

const error_msg = document.getElementById("error_msg");

let email,
  password = "";

inputs[1].addEventListener("change", function (e) {
  email = e.target.value;
});

inputs[2].addEventListener("change", function (e) {
  password = e.target.value;
});

btn_login.addEventListener("click", function (e) {
  e.preventDefault();

  if (Login({ email, password })) {
    btn_close.click();
    window.location.replace("./pages/administracion.html");
  } else {
    error_msg.style.visibility = "visible";
    setTimeout(function () {
      error_msg.style.visibility = "hidden";
    }, 2000);
  }
});

btn_logout.addEventListener("click", function () {
  Logout();
  window.location.replace("../index.html");
});
