import api from "./apiConfig.js";

export const getPrices = async () => {
    try {
      const response = await api.get("/price-lists/");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const getPrice = async (id) => {
    try {
      const response = await api.get(`/price-lists/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updatePrice = async (id, priceData) => {
    try {
      const response = await api.put(`/price-lists/${id}/`, priceData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const deletePrice = async (id) => {
    try {
      const response = await api.delete(`/price-lists/${id}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  