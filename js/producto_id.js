//?id=1&nombre=Remera%20Puma

import { GetProductsById } from "./services/products_manager.js";

const urlParams = new URLSearchParams(window.location.search);

const productoId = urlParams.get("id");

const productoDetalle = GetProductsById(productoId);

const contenedor = document.getElementById("prd-detail");

contenedor.innerHTML = `<h4>${productoDetalle.nombre}</h4> 
<br>
<span>${productoDetalle.price}</span>
<br>
<span>${productoDetalle.stock}</span>
<br>
<img src="${productoDetalle.imgUrl}"/>`;
