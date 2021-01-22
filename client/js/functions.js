/*
eslint no-return-assign: 'error'
*/
export function calculateTotalPrice(element) {
  element.totalPrice = element.priceForOne * element.count;
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
    element.count = countNumber;
  }
}

export function setPrice(element, price) {
  const priceNumber = Number(price);
  if (!Number.isNaN(priceNumber) && priceNumber > 0) {
    element.priceForOne = priceNumber;
  }
}