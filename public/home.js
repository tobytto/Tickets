import products from "../src/models/products";

const serverUrl = 'http://localhost:5555/products';
const itemsPath = 'items/';
const imagesPath = 'img/';

window.onload = getData();

const items = document.querySelector('.items');

function getData() {
  fetch(`${serverUrl}${itemsPath}`)
    .then((res) => res.json())
    .then((data) => printData(data))
    .then((data) => console.log(data))
}

function printData(data) {
  const itemContainer = document.createElement('div');
  itemContainer.className = 'row';

  data.forEach((item) => {
    itemContainer.innerHTML += createDomElement(item);
    items.append(itemContainer);
  });
}

function createDomElement(item) {
  const itemHtml = `
    <div class="col-12 col-md-6">
        <div class="item shadow mb-4" data-id=${products._id}>
            <h3 class="item-title">${products.name}</h3>
            <img class="item-image" src=${serverUrl}${imagesPath}${products.image}>

            <div class="item-details">
                <h4 class="item-price">${products.price}€</h4>
                <button class="item-button btn btn-primary addToCart">AÑADIR AL CARRITO</button>
            </div>
        </div>
    </div>`;
  return itemHtml;
}

