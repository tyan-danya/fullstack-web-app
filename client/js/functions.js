/*
eslint no-return-assign: 'error'
*/
export function calculateTotalPrice(element) {
  element.totalPrice = element.product_price * element.product_amount;
  return element;
}

export function getAllTotalPriceReducer(accumulator, currentValue) {
  if (typeof(accumulator) === 'object') {
    accumulator = accumulator.totalPrice;
  }
  return accumulator + currentValue.totalPrice;
}

export function getAllTotalPrice(elements) {
  const result = elements.reduce(getAllTotalPriceReducer);
  if (Number.isNaN(result)) {
    return 0;
  }
  return result;
}

export function setCount(element, count) {
  const countNumber = Number(count);
  if (!Number.isNaN(countNumber) && countNumber > 0) {
    element.product_amount = countNumber;
  }
}

export function setPrice(element, price) {
  const priceNumber = Number(price);
  if (!Number.isNaN(priceNumber) && priceNumber > 0) {
    element.product_price = priceNumber;
  }
}

export function addEventDblClick(element) {
  element.addEventListener('dblclick', (event) => {
    event.target.readOnly = false;
  })
}

export async function getAllProducts() {
  let response = await fetch('http://localhost:8080/product');
  return await response.json();
}

export async function updateProduct(id, newProduct) {
  let response = await fetch('http://localhost:8080/product/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newProduct)
  });
  return await response.json();
}

export async function deleteProduct(id) {
  let response = await fetch('http://localhost:8080/product/' + id, {
    method: 'DELETE'
  });
  return await response.json();
}

export async function addProduct(newProduct) {
  let response = await fetch('http://localhost:8080/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newProduct)
  });
  return await response.json();
}