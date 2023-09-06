import { GetItem, SetItem } from "../helpers/local_storage_manager.js";
import CONSANTS from "../constants/keys.js";
import { Validate } from "../helpers/error_manager.js";
import MESSAGES from "../constants/messages.js";

function CreateProduct({ nombre, description, imgUrl, price, stock }) {
  let products = GetItem(CONSANTS.PRODUCTOS);

  if (!products) {
    products = [];
  }

  products.push({
    id: GetLastId(products),
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

function UpdateProduct({ id, nombre, description, imgUrl, price, stock }) {
  let products = GetProductsAndVerify();
  console.log(products);
  if (products.length > 0) {
    let index = products.findIndex(function (prd) {
      return prd.id === id;
    });

    let filteredProduct = products[index];
    filteredProduct.nombre = nombre;
    filteredProduct.description = description;
    filteredProduct.imgUrl = imgUrl;
    filteredProduct.price = price;
    filteredProduct.stock = stock;

    products[index] = filteredProduct;

    SetItem({
      key: CONSANTS.PRODUCTOS,
      data: products,
    });

    return filteredProduct;
  }
  return products;
}

function DeleteProduct(id) {
  let products = GetProductsAndVerify();
  if (products.length <= 0) return products;

  let deletedProductArray = products.filter(function (prd) {
    return prd.id !== id;
  });

  SetItem({
    key: CONSANTS.PRODUCTOS,
    data: deletedProductArray,
  });

  return deletedProductArray;
}

function GetProducts() {
  return GetProductsAndVerify();
}


//#region  private
function GetProductsAndVerify() {
  try {
    let products = GetItem(CONSANTS.PRODUCTOS);
    Validate(!products, MESSAGES.NO_EXISTE_NINGUN_PRODUCTO);
    return products;
  } catch (error) {
    return [];
  }
}

function GetLastId(products) {
  if (products.length === 0) return 1;
  return products[products.length - 1].id + 1;
}

//#endregion private

export { CreateProduct, UpdateProduct, DeleteProduct, GetProducts};
