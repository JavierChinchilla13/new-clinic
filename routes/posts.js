const express = require("express");
const router = express.Router();

const {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} = require("../controllers/postsController");

const { uploadProductImage } = require("../controllers/uploadsController");

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").get(getPost).delete(deletePost).patch(updatePost);

router.route("/uploads").post(uploadProductImage);

module.exports = router;
