import {
  CreateProduct,
  DeleteProduct,
  GetProducts,
  GetProductsById,
  UpdateProduct,
} from "./services/products_manager.js";

//#region  CONSTANTS
let products = GetProducts();
const body = document.getElementById("table-body");
const btn_guardar_modificad = document.getElementById(
  "btn-guardar-prd-modificado"
);
const btn_eliminar_prd = document.getElementById("btn-eliminar-prd");
//#endregion CONSTANTS

//#region  VARIABLES
let nombre = document.getElementById("nombre-prd");
let descripcion = document.getElementById("descripcion");
let stock = document.getElementById("stock");
let precio = document.getElementById("precio");
let imagen = document.getElementById("foto-url");
let currentId = 0;

let nom,
  desc,
  cant,
  price,
  img = "";

let nombre_add = document.getElementById("nombre-add");
let descripcion_add = document.getElementById("descripcion-add");
let stock_add = document.getElementById("stock-add");
let precio_add = document.getElementById("precio-add");
let imagen_add = document.getElementById("foto-url-add");

let nom_add,
  desc_add,
  cant_add,
  price_add,
  img_add = "";

const btn_guardar = document.getElementById("btn-guardar");
//#endregion  VARIABLES

//#region  INIT DATA
if (products.length > 0) {
  let htmlString = "";
  products.map(function (producto) {
    htmlString += `<tr><th scope="row">${producto.id}</th>
    <td>${producto.nombre}</td>
    <td><img src="${producto.imgUrl}"/></td>
    <td>${producto.price}</td>
    <td>${producto.stock}</td>
    <td><button type="button" id="m-${producto.id}" data-bs-toggle="modal" data-bs-target="#updateModal">M</button><button type="button" id="e-${producto.id}" data-bs-toggle="modal" data-bs-target="#deleteModal">E</button></td></tr>`;
  });

  body.innerHTML = htmlString;
}
//#endregion INIT DATA

//#region  LOGIC
const tbody = document.getElementById("table-body");
let array_ids_m = [];
let array_ids_e = [];

tbody.childNodes.forEach((tablerow) => {
  tablerow.childNodes.forEach((tabledatacell) => {
    if (tabledatacell.childNodes.length > 1) {
      array_ids_m.push(tabledatacell.firstChild.id);
      array_ids_e.push(tabledatacell.lastChild.id);
    }
  });
});

array_ids_m.forEach((id) => {
  document.getElementById(id).addEventListener("click", function (e) {
    let idProcesado = id.split("-")[1];
    const product = GetProductsById(+idProcesado);
    currentId = +idProcesado;
    nombre.value = product.nombre;
    nom = product.nombre;

    descripcion.value = product.description;
    desc = product.description;

    stock.value = product.stock;
    cant = product.stock;

    precio.value = product.price;
    price = product.price;

    imagen.value = product.imgUrl;
    img = product.imgUrl;
  });
});

array_ids_e.forEach((id) => {
  document.getElementById(id).addEventListener("click", function (e) {
    let idProcesado = id.split("-")[1];
    currentId = +idProcesado;
  });
});

btn_guardar_modificad.addEventListener("click", function () {
  UpdateProduct({
    id: currentId,
    description: desc,
    imgUrl: img,
    nombre: nom,
    price: +price,
    stock: +cant,
  });
  window.location.reload();
});

btn_eliminar_prd.addEventListener("click", function () {
  DeleteProduct(currentId);
  window.location.reload(); //NO ES LA OPTIMA
});

nombre.addEventListener("change", function (e) {
  nom = e.target.value;
});

descripcion.addEventListener("change", function (e) {
  desc = e.target.value;
});

stock.addEventListener("change", function (e) {
  cant = e.target.value;
});

precio.addEventListener("change", function (e) {
  price = e.target.value;
});

imagen.addEventListener("change", function (e) {
  img = e.target.value;
});

//#region  ADD
nombre_add.addEventListener("change", function (e) {
  nom_add = e.target.value;
});

descripcion_add.addEventListener("change", function (e) {
  desc_add = e.target.value;
});

stock_add.addEventListener("change", function (e) {
  cant_add = e.target.value;
});

precio_add.addEventListener("change", function (e) {
  price_add = e.target.value;
});

imagen_add.addEventListener("change", function (e) {
  img_add = e.target.value;
});

btn_guardar.addEventListener("click", function () {
  console.log("ERROR");
  CreateProduct({
    imgUrl: img_add,
    description: desc_add,
    nombre: nom_add,
    price: price_add,
    stock: cant_add,
  });
  window.location.reload();
});

//#endregion ADD
//#endregion LOGIC
