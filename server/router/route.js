const express = require("express");
const login = require("../controller/login");
const addProduct = require("../controller/product/addProduct");
const deleteProduct = require("../controller/product/deleteProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const productList = require("../controller/product/productList");
const searchProduct = require("../controller/product/searchProduct");
const updateProduct = require("../controller/product/updateProduct");
const userSignUp = require("../controller/usersSignUp");
const jwt = require("jsonwebtoken");
const addCategory = require("../controller/product/addCategory");
const categoryList = require("../controller/product/categoryList");
const jwtkey = "e-comm";
const route = express.Router();

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtkey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
// auth routes

route.post("/signUp", userSignUp);
route.post("/login", login);

// products routes

route.post("/add-product", authenticateJWT, addProduct);
route.get("/product-list", authenticateJWT, productList);
route.delete(`/product-delete/:id`, authenticateJWT, deleteProduct);
route.patch(`/product-update/:id`, authenticateJWT, updateProduct);
route.get("/product-details/:id", authenticateJWT, getProductDetails);

// ? search product api
route.get(`/search-product/:search`, authenticateJWT, searchProduct);

// ? category related api 
route.get('/category-list',authenticateJWT,categoryList)
route.post("/add-category", authenticateJWT, addCategory);


module.exports = route;
