import { GetProducts } from "./services/products_manager.js";

const div_prd = document.getElementById("prd-container");

let prd = GetProducts();

if (prd.length > 0) {
  let htmlString = "";
  prd.forEach((producto) => {
    htmlString += `<section>
        <span>${producto.nombre}</span>
        <span>${producto.price}</span>
        <p>${producto.description}</p>
        <img src="${producto.imgUrl}" />
        <a href="./producto_id.html">Detalle</a>
        </section>`;
  });

  div_prd.innerHTML = htmlString;
}
