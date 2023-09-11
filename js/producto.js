import { GetProducts } from "./services/products_manager.js";

const div_prd = document.getElementById("prd-container");

let prd = GetProducts();
//queryString -> query = Consulta y String = ""
//Va colocado sobre la URL del sitio web
//se inicia con un signo de pregunta ?
//seguido de el nombre de la variable y el dato
//Se pueden pasar cuantos datos sean necesarios concatenados con el &

if (prd.length > 0) {
  let htmlString = "";
  prd.forEach((producto) => {
    htmlString += `<div class="card" style="width: 18rem;">
    <img src="${producto.imgUrl}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="card-text">${producto.price}</p>
      <a href="./producto_id.html?id=${producto.id}" class="btn btn-primary">Detalle</a>
    </div>
  </div>`;
  });

  div_prd.innerHTML = htmlString;
}
