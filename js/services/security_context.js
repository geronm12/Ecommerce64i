import CONSTANTS from "../constants/keys.js";
import { GetItem } from "../helpers/local_storage_manager.js";

let user = GetItem(CONSTANTS.USER_LOGGED);
const hideMenu = document.getElementsByClassName("hide");
const logout = document.getElementById("logout");
const login = document.getElementById("login");

if (user && user.tipo === "admin") {
  for (let index = 0; index < hideMenu.length; index++) {
    const element = hideMenu[index];
    element.classList.remove("hide");
  }
} else {
  for (let index = 0; index < hideMenu.length; index++) {
    const element = hideMenu[index];
    element.classList.add("hide");
  }
}

if (user) {
  logout.style.display = "block";
  login.style.display = "none";
} else {
  login.style.display = "block";
  logout.style.display = "none";
}
