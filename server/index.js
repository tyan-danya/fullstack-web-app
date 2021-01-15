const fs = require('fs');
const path = require('path');

function getAllProducts(fileJSON) {
  return JSON.parse(
    fs.readFileSync(fileJSON, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
}

function getProductById(fileJSON, id) {
  let productsList = JSON.parse(
    fs.readFileSync(fileJSON, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === id) {
      return productsList[i];
    }
  }
}


function addNewProduct(fileJSON, newProductId, newProductName, newProductPrice, newProductAmount) {
  let productsList = JSON.parse(
    fs.readFileSync(fileJSON, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
  productsList.push({
    id: newProductId,
    product_name: newProductName,
    product_price: newProductPrice,
    product_amount: newProductAmount
  });
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function updateProductById(fileJSON, productid, newProductId, newProductName, newProductPrice, newProductAmount) {
  let productsList = JSON.parse(
    fs.readFileSync(fileJSON, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === productid) {
      productsList[i] = {
        id: newProductId,
        product_name: newProductName,
        product_price: newProductPrice,
        product_amount: newProductAmount
      };
      break;
    }
  }
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function deleteProduct(fileJSON, productid) {
  let productsList = JSON.parse(
    fs.readFileSync(fileJSON, "utf8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
    })
  );
  for (let i = 0; i < productsList.length; i++) {
    if (productsList[i].id === productid) {
      let index = productsList.indexOf(productsList[i]);
      productsList.splice(index, 1);
      break;
    }
  }
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

let JSONfileName = path.resolve(__dirname, 'products.json');
console.log(getAllProducts(JSONfileName));