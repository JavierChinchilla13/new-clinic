const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} = require("../controllers/productsController");

const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(authenticateUser, createProduct).get(getAllProducts);

router.route("/uploads").post(authenticateUser, uploadProductImage);

router
  .route("/:id")
  .get(getProduct)
  .delete(authenticateUser, deleteProduct)
  .patch(authenticateUser, updateProduct);

module.exports = router;
