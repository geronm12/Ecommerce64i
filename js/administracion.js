import {
  GetProducts,
  GetProductsById,
  UpdateProduct,
} from "./services/products_manager.js";

const products = GetProducts();
const body = document.getElementById("table-body");
const btn_guardar_modificad = document.getElementById(
  "btn-guardar-prd-modificado"
);
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

if (products.length > 0) {
  let htmlString = "";
  products.map(function (producto) {
    htmlString += `<tr><th scope="row">${producto.id}</th>
    <td>${producto.nombre}</td>
    <td><img src="${producto.imgUrl}"/></td>
    <td>${producto.price}</td>
    <td>${producto.stock}</td>
    <td><button id="${producto.id}" data-bs-toggle="modal" data-bs-target="#updateModal">M</button> Eliminar</td></tr>`;
  });

  body.innerHTML = htmlString;
}

const tbody = document.getElementById("table-body");
let array_ids = [];

tbody.childNodes.forEach((node) => {
  node.childNodes.forEach((child_node) => {
    if (child_node.childNodes.length > 1) {
      array_ids.push(child_node.firstChild.id);
    }
  });
});

array_ids.forEach((id) => {
  document.getElementById(id).addEventListener("click", function (e) {
    const product = GetProductsById(+id);
    currentId = +id;
    nombre.value = product.nombre;
    descripcion.value = product.description;
    stock.value = product.stock;
    precio.value = product.price;
    imagen.value = product.imgUrl;
  });
});

btn_guardar_modificad.addEventListener("click", function () {
  UpdateProduct({
    id: currentId,
    description: desc,
    imgUrl: img,
    nombre: nom,
    price: +precio,
    stock: +stock,
  });
});

nombre.addEventListener("change", function (e) {
  nom = e.target.value;
});
