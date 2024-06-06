import api from "./apiConfig.js";

export const getProducts = async () => {
  try {
    const response = await api.get("/products/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/product/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/product/${id}/`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/product/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
