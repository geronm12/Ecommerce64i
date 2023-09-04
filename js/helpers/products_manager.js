import { GetItem, SetItem } from "./local_storage_manager.js";
import CONSANTS from "../constants/keys.js";

function CreateProduct({ nombre, description, imgUrl, price, stock }) {
  let products = GetItem(CONSANTS.PRODUCTOS);

  if (!products) {
    products = [];
  }

  products.push({
    id: GetLastId(products) + nombre,
    nombre,
    description,
    imgUrl,
    price,
    stock,
  });

  SetItem({
    key: CONSANTS.PRODUCTOS,
    data: products,
  });
}

function GetLastId(products) {
  if (products.length === 0) return 1;
  return products[products.length - 1].id + 1;
}

export { CreateProduct };
