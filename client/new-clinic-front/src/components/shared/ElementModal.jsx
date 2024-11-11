import React, { useState } from "react";
import PropTypes from "prop-types";
import Label from "./Label";
import Input from "./Input";
import Button from "./Button";

const handleSubmit = ({ isOpen, onClose, onAddProduct }) => {
  const newProduct = {
    name,
    description,
    image,
    type,
    price: parseFloat(price),
    state,
  };
  onAddProduct(newProduct);
  onClose();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Add Product or Service</h2>

        <Label>Name</Label>
        <Input text={name} handleText={setName} placeHolder="Enter name" />

        <Label>Description</Label>
        <Input
          text={description}
          handleText={setDescription}
          placeHolder="Enter description"
        />

        <Label>Image URL</Label>
        <Input
          text={image}
          handleText={setImage}
          placeHolder="Enter image URL"
        />

        <Label>Type</Label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
        >
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>

        <Label>Price</Label>
        <Input text={price} handleText={setPrice} placeHolder="Enter price" />

        <Label>Status</Label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value === "true")}
          className="py-2 px-3 rounded-xl border-2 border-blue-300 mb-4"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        <div className="flex justify-end space-x-2 mt-4">
          <Button onClickFunc={onClose} extraStyle="bg-gray-300">
            Cancel
          </Button>
          <Button onClickFunc={handleSubmit} extraStyle="bg-emerald-400">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ElementModal;
