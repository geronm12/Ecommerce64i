import CONSTANTS from "../constants/keys.js";
import { GetItem } from "./local_storage_manager.js";

let user = GetItem(CONSTANTS.USER_LOGGED);
const hideMenu = document.getElementsByClassName("hide");

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
