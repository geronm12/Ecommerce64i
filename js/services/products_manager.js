import { GetItem, SetItem } from "../helpers/local_storage_manager.js";
import CONSANTS from "../constants/keys.js";
import { Validate } from "../helpers/error_manager.js";
import MESSAGES from "../constants/messages.js";

//ABM -> Interacturar sobre la persistencia de la base de datos
//R -> Read Leer
//Crear - Agregar - Add - Alta
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

//Update - Modificar - Modificación - Unico
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

//Delete - Borrar - Baja - Eliminar Grupos
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

//Read - Leer - Por Id (filtro) - Por Cantidad
//Por Id (filtro) - Código
function GetProducts() {
  let products = GetProductsAndVerify();
  if (products.length === 0) {
    return [];
  }

  const arrayProductos = [];

  products.forEach((producto) => {
    arrayProductos.push({
      id: producto.id,
      nombre: producto.nombre,
      imgUrl: producto.imgUrl,
      stock: producto.stock,
      price: producto.price,
    });
  });

  return arrayProductos;
}

function GetProductsById(id) {
  const products = GetProductsAndVerify();

  let producto = products.filter(function (producto) {
    return producto.id === +id;
  });

  return producto[0];
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

export {
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
  GetProducts,
  GetProductsById,
};
