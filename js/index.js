import CONSTANTS from "./constants/keys.js";
import { CreateProduct, UpdateProduct } from "./services/products_manager.js";
import { CrearUsuario, VerifyIfExists } from "./services/sesion_manager.js";

if (!VerifyIfExists({ email: "admin" })) {
  CrearUsuario({
    nombre: "admin",
    email: "admin",
    password: "admin",
    tipo: "admin",
  });
}
