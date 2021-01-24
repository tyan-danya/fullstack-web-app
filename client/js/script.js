/*
eslint no-param-reassign: "error"
*/
import {
  calculateTotalPrice,
  getAllTotalPrice,
  setCount,
  setPrice,
  addEventDblClick,
  getAllProducts,
  updateProduct,
  deleteProduct,
  addProduct
} from './functions.js';

function createObservableArray(array, callback) {
  for (let i = 0; i < array.length; i++) {
    array[i] = new Proxy(array[i], {
      set(target, property, value) {
        target[property] = value;
        callback();
        return true;
      },
    });
  }
  return new Proxy(array, {
    set(target, property, value) {
      target[property] = value;
      callback();
      return true;
    }
  });
}

window.onload = async function onload() {
  async function updateUI() {
    const tableTemplateSource = document.querySelector(".table-template").innerHTML;
    const tableTemplate = Handlebars.compile(tableTemplateSource);
    const result = getAllTotalPrice(productsList);
    const tableHTML = tableTemplate({ productsList, result });
    document.querySelector(".product-table").innerHTML = tableHTML;
    const inputs = document.querySelectorAll(".product-table-row-cell__input");
    inputs.forEach(addEventDblClick);
    inputs.forEach((input) => {
      input.addEventListener('keydown', (event) => {
        if (event.keyCode === 13) {
          const elementId = Number(input.getAttribute('data-id'));
          let productsListIndex;
          productsList.forEach((element, i) => {
            if (element.id === elementId) {
              productsListIndex = i;
            }
          });
          if (input.classList.contains('product-table-row-cell__input--count')) {
            setCount(productsList[productsListIndex], Number(event.target.value));
          } else if (input.classList.contains('product-table-row-cell__input--price')) {
            setPrice(productsList[productsListIndex], Number(event.target.value));
          }
          delete productsList[productsListIndex].totalPrice;
          updateProduct(productsList[productsListIndex].id, productsList[productsListIndex]);
          calculateTotalPrice(productsList[productsListIndex]);
        }
      })
    });
    const deleteImages = document.querySelectorAll(".product-table-row-cell__button--delete");
    deleteImages.forEach((element) => {
      element.addEventListener('click', (event) => {
        const elementId = Number(element.getAttribute('data-id'));
        let productsListIndex;
        productsList.forEach((element, i) => {
          if (element.id === elementId) {
            productsListIndex = i;
          }
        });
        deleteProduct(productsList[productsListIndex].id);
        productsList.splice(productsListIndex, 1);
      });
    });
    const addButton = document.querySelector(".product-table-row-cell--add");
    addButton.addEventListener('click', (event) => {
      let newRow = document.createElement("tr");
      newRow.innerHTML = '<th class="product-table-row-cell"></th>' +
        '<th class="product-table-row-cell">' +
        '<input type="text" class="product-table-row-cell__input product-table-row-cell__input--count" data-id="" value="" readonly>' +
        '</th>' +
        '<th class="product-table-row-cell">' +
        '<input type="text" class="product-table-row-cell__input product-table-row-cell__input--price" data-id="" value="" readonly>' +
        '</th>' +
        '<th class="product-table-row-cell"></th>' +
        '<th class="product-table-row-cell product-table-row-cell--save">' +
        '<div class="product-table-row-cell__button product-table-row-cell__button--save" data-id="">&#10004;</div>' +
        '</th>';

      let tableRows = document.querySelectorAll(".product-table-row");
      let tableRowsAmount = tableRows.length;
      let addRow = tableRows[tableRowsAmount - 2];
      addRow.style.display = "none";
      addRow.parentNode.insertBefore(newRow, addRow);
    });
  }
  let productsList = await getAllProducts();
  for (let i = 0; i < productsList.length; i++) {
    calculateTotalPrice(productsList[i]);
  }
  productsList = createObservableArray(productsList, updateUI);
  updateUI();
}