const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");
const moment = require("moment");

const createProduct = async (req, res) => {
  console.log(req.body);
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const deleteProduct = async (req, res) => {
  const {
    params: { id: productId },
  } = req;

  const product = await Product.findByIdAndRemove({
    _id: productId,
  });
  if (!product) {
    throw new NotFoundError(`No job with id ${productId}`);
  }
  res.status(StatusCodes.OK).send();
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products });
};

const updateProduct = async (req, res) => {
  const {
    body: { name, description },
    params: { id: productId },
  } = req;

  if (name === "" || description === "") {
    throw new BadRequestError("Name or Description fields cannot be empty");
  }
  const product = await Product.findByIdAndUpdate(
    { _id: productId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!product) {
    throw new NotFoundError(`No product with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const getProduct = async (req, res) => {
  const {
    params: { id: productId },
  } = req;

  const product = await Product.findOne({
    _id: productId,
  });
  if (!product) {
    throw new NotFoundError(`No job with id ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  getProduct,
};
