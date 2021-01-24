const express = require("express");
const app = express();
app.use(express.json());

const fs = require("fs");
const path = require("path");

app.use(function(req, res, next) {
  /*var origins = [
    'http://example.com',
    'http://www.example.com'
  ];

  for (var i = 0; i < origins.length; i++) {
    var origin = origins[i];

    if (req.headers.origin.indexOf(origin) > -1) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
    }
  }*/
  res.header('Access-Control-Allow-Origin', "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function getAllProducts(fileJSON) {
  try {
    return JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return false;
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
          return false;
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
          return false;
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
      return false;
    }
  });
  return true;
}

function updateProductById(fileJSON, productid, newProduct) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return false;
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
      return false;
    }
  });
  return true;
}

function deleteProduct(fileJSON, productid) {
  let productsList;
  try {
    productsList = JSON.parse(
      fs.readFileSync(fileJSON, "utf8", (err, data) => {
        if (err) {
          console.error(err);
          return false;
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
      return false;
    }
  });
  return true;
}

function checkId(id) {
  return !isNaN(parseInt(id));
}


const JSONfileName = path.resolve(__dirname, "products.json");

const newProduct = {
  id: 4,
  product_name: "Яйца",
  product_price: 65,
  product_amount: 50
};

app.get("/product", function(request, response) {
  response.send(getAllProducts(JSONfileName));
});

app.get("/product/:id", function(request, response) {
  let id = Number(request.params.id);
  if (!checkId(id)) {
    response.status(482).send({
      error: 'Incorrect id'
    });
    return;
  }
  let result = getProductById(JSONfileName, id);
  if (result === undefined) {
    response.status(483).send({
      error: 'Product not found'
    });
  }
  response.send(result);
});

app.post("/product", function(request, response) {
  let result = addNewProduct(JSONfileName, request.body);
  if (result) {
    response.status(280).send({
      result: 'ok'
    });
  } else {
    response.status(481).send({
      error: 'Failed to add product'
    });
  }
});

app.put("/product/:id", function(request, response) {
  let id = Number(request.params.id);
  if (!checkId(id)) {
    response.status(482).send({
      error: 'Incorrect id'
    });
    return;
  }
  let result = updateProductById(JSONfileName, id, request.body);
  if (result) {
    response.status(280).send({
      result: 'ok'
    });
  } else {
    response.status(481).send({
      error: 'Failed to update product'
    });
  }
});

app.delete("/product/:id", function(request, response) {
  let id = Number(request.params.id);
  if (!checkId(id)) {
    response.status(482).send({
      error: 'Incorrect id'
    });
    return;
  }
  let result = deleteProduct(JSONfileName, id);
  if (result) {
    response.status(280).send({
      result: 'ok'
    });
  } else {
    response.status(481).send({
      error: 'Failed to delete product'
    });
  }
});

app.listen(8080);