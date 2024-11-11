const express = require("express");
const router = express.Router();

const {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
} = require("../controllers/productsController");

const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(createProduct).get(getAllProducts);

router.route("/uploads").post(uploadProductImage);

router.route("/:id").get(getProduct).delete(deleteProduct).patch(updateProduct);

module.exports = router;
