/*
eslint no-param-reassign: "error"
*/
import {
  calculateTotalPrice,
  getAllTotalPrice,
  setCount,
  setPrice,
  setName,
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
    const resultTemp = getAllTotalPrice(productsList);
    console.log(resultTemp);
    const tableHTML = tableTemplate({ productsList, resultTemp });
    document.querySelector(".product-table").innerHTML = tableHTML;
    const inputs = document.querySelectorAll(".product-table-row-cell__input");
    inputs.forEach(addEventDblClick);
    inputs.forEach((input) => {
      input.addEventListener('keydown', async function(event) {
        if (event.keyCode === 13) {
          const elementId = Number(input.getAttribute('data-id'));
          let productsListIndex;
          productsList.forEach((element, i) => {
            if (element.id === elementId) {
              productsListIndex = i;
            }
          });
          if (input.classList.contains('product-table-row-cell__input--count')) {
            const result = setCount(productsList[productsListIndex], event.target.value);
            if (result.result !== "ok") {
              alert(result.error);
            }
          } else if (input.classList.contains('product-table-row-cell__input--price')) {
            const result = setPrice(productsList[productsListIndex], event.target.value);
            if (result.result !== "ok") {
              alert(result.error);
            }
          } else if (input.classList.contains('product-table-row-cell__input--name')) {
            const result = setName(productsList[productsListIndex], event.target.value);
            if (result.result !== "ok") {
              alert(result.error);
            }
          }
          delete productsList[productsListIndex].totalPrice;
          const result = await updateProduct(productsList[productsListIndex].id, productsList[productsListIndex]);
          if (result.result !== "ok") {
            alert(result.error);
          }
          calculateTotalPrice(productsList[productsListIndex]);
        }
      })
    });
    const deleteImages = document.querySelectorAll(".product-table-row-cell__button--delete");
    deleteImages.forEach((element) => {
      element.addEventListener('click', async function() {
        const elementId = Number(element.getAttribute('data-id'));
        let productsListIndex;
        productsList.forEach((product, i) => {
          if (product.id === elementId) {
            productsListIndex = i;
          }
        });
        const result = await deleteProduct(productsList[productsListIndex].id);
        if (result.result === "ok") {
          productsList.splice(productsListIndex, 1);
        } else {
          alert(result.error);
        }

      });
    });
    const addButton = document.querySelector(".product-table-row-cell--add-button");
    addButton.addEventListener('click', () => {
      const addRow = document.querySelector(".product-table-row--add");
      addRow.style.display = "table-row";
      const addButtonRow = document.querySelector(".product-table-row--add-button");
      addButtonRow.style.display = "none";
    });
    const saveButton = document.querySelector(".product-table-row-cell__button--save");
    saveButton.addEventListener('click', async function() {
      const newProductNameRow = document.querySelector(".product-table-row-cell-add__input--name");
      const newProductAmountRow = document.querySelector(".product-table-row-cell-add__input--count");
      const newProductPriceRow = document.querySelector(".product-table-row-cell-add__input--price");
      let newId = 0;
      productsList.forEach((element) => {
        if (newId < element.id) {
          newId = element.id;
        }
      })
      const newProduct = {
        id: newId + 1,
        product_name: newProductNameRow.value,
        product_amount: newProductAmountRow.value,
        product_price: newProductPriceRow.value
      };
      const result = await addProduct(newProduct);
      if (result.result === "ok") {
        productsList.push(newProduct);
        newProductNameRow.value = "";
        newProductAmountRow.value = "";
        newProductPriceRow.value = "";
        const addButtonRow = document.querySelector(".product-table-row--add-button");
        addButtonRow.style.display = "table-row";
        const addRow = document.querySelector(".product-table-row--add");
        addRow.style.display = "none";
      } else {
        alert(result.error);
      }

    });
  }
  const result = await getAllProducts();
  if (result.error !== undefined) {
    alert(result.error);
    return;
  }
  let productsList = result;
  for (let i = 0; i < productsList.length; i++) {
    calculateTotalPrice(productsList[i]);
  }
  productsList = createObservableArray(productsList, updateUI);
  updateUI();
}