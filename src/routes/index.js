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
router.get("/", index);

module.exports = router;
