const express = require("express");
const router = express.Router();
const { authentication } = require("../middlewares/auth");

const { checkRole } = require("../middlewares/checkRole");
const { partner, user } = checkRole;
const { uploadFile } = require("../middlewares/upload");

// import controller
const { index } = require("../controllers");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  resetPasswordUser,
} = require("../controllers/user");
const { login } = require("../controllers/login");
const { registration } = require("../controllers/register");
const {
  getAllTransaction,
  getDetailTransaction,
  getUserTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transaction");

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
router.put(
  "/users/:userId",
  authentication,
  uploadFile("imageFile"),
  updateUser
);
router.put("/reset/:userId", authentication, resetPasswordUser);
router.delete("/users/:id", authentication, deleteUser); // id user/partner

// products
router.get("/products", authentication, partner, getAllProduct);
router.get("/products/:id", authentication, partner, getProductByPartner);
router.get("/product/:id", authentication, partner, getDetailProduct);
router.post("/product", authentication, partner, addBook);
router.put("/product/:id", authentication, partner, editBook);
router.delete("/product/:id", authentication, partner, deleteProduct);

//transaction
router.get("/transactions", getAllTransaction);
router.get("/transactions/:transactionId", getDetailTransaction);
router.get("/my-transactions", authentication, getUserTransaction);
router.post("/transactions", addTransaction);
router.put("/transactions/:transactionId", editTransaction);
router.delete("/transactions/:transactionId", deleteTransaction);

// login
router.post("/login", login);

//registration
router.post("/register", registration);

module.exports = router;
