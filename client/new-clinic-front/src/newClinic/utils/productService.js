import axios from "axios";

const api = axios.create({
  baseURL: "/api/v1",
}); 

const getProducts = () => api.get("/products");
const deletePost = (id) => api.delete(`/products/${id}`);
const createPost = (post) => api.post("/products", post);
const uploadImage = (image) => api.post("/products/uploads", image);
const updatePost = (id, post) => api.put(`/products/${id}`, post);


export { getProducts, deletePost, createPost, updatePost, uploadImage };
