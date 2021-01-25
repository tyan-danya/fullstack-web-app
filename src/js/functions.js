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
  if (count === "") {
    return {
      error: "Field 'amount' has null value"
    };
  }
  const countNumber = Number(count);
  if (!Number.isNaN(countNumber) && countNumber > 0) {
    element.product_amount = countNumber;
    return {
      result: "ok"
    };
  }
  return {
    error: "Field 'amount' has invalid value"
  };
}

export function setPrice(element, price) {
  if (price === "") {
    return {
      error: "Field 'price' has null value"
    };
  }
  const priceNumber = Number(price);
  if (!Number.isNaN(priceNumber) && priceNumber > 0) {
    element.product_price = priceNumber;
    return {
      result: "ok"
    };
  }
  return {
    error: "Field 'price' has invalid value"
  };
}

export function setName(element, name) {
  if (name === "") {
    return {
      error: "Field 'price' has null value"
    };
  }
  element.product_name = name;
  return {
    result: "ok"
  };
}

export function addEventDblClick(element) {
  element.addEventListener('dblclick', (event) => {
    event.target.readOnly = false;
  })
}

export async function getAllProducts() {
  try {
    const response = await fetch('http://localhost:3000/product');
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: "Server error. Couldn't get the list of products"
    };
  }

}

export async function updateProduct(id, newProduct) {
  try {
    const response = await fetch('http://localhost:3000/product/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newProduct)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: "Failed to update product"
    };
  }

}

export async function deleteProduct(id) {
  try {
    const response = await fetch('http://localhost:3000/product/' + id, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: "Failed to delete product"
    };
  }
}

export async function addProduct(newProduct) {
  try {
    const response = await fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(newProduct)
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return {
      error: "Failed to add product"
    };
  }
}