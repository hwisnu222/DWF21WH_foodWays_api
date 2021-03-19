const express = require("express");
const router = express.Router();

// import controller
const { index } = require("../controllers");
const { getAllUsers, deleteUser } = require("../controllers/user");
const { login } = require("../controllers/login");
const { registration } = require("../controllers/register");
const { getAllTransaction } = require("../controllers/transaction");
const {
  getAllProduct,
  getProductByPartner,
  getDetailProduct,
  addBook,
  editBook,
  deleteProduct,
} = require("../controllers/product");

// route controller
// user route
router.get("/", index);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);

// products
router.get("/products", getAllProduct);
router.get("/products/:id", getProductByPartner);
router.get("/product/:id", getDetailProduct);
router.post("/product", addBook);
router.put("/product/:id", editBook);
router.delete("/product/:id", deleteProduct);

router.post("/login", login);
//transaction

// login

//registration
router.post("/register", registration);

module.exports = router;
