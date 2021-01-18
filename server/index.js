const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");

function getAllProducts(fileJSON) {
  try {
    return JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
}

function getProductById(fileJSON, id) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  return productsList.find((item) => item.id === Number(id));
}

function addNewProduct(fileJSON, newProduct) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  productsList.push(newProduct);
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function updateProductById(fileJSON, productid, newProduct) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  const index = productsList.findIndex((item) => item.id === productid);
  productsList[index] = newProduct;
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

function deleteProduct(fileJSON, productid) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
      })
    );
  } catch (err) {
    console.log(err);
    return false;
  }
  const index = productsList.findIndex((item) => item.id === productid);
  productsList.splice(index, 1);
  fs.writeFileSync(fileJSON, JSON.stringify(productsList), (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

const JSONfileName = path.resolve(__dirname, "products.json");

const newProduct = {
  id: 4,
  product_name: "Яйца",
  product_price: 65,
  product_amount: 50
};
//console.log(deleteProduct(JSONfileName, 4));

app.get("/products", (req, res) => {
  res.send(getAllProducts(JSONfileName));
});

app.get("/products/:id", (req, res) => {
  res.send(getProductById(JSONfileName, req.params.id));
});

app.listen(8080);
