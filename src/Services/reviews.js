import api from "./apiConfig.js";

export const getReviews = async () => {
  try {
    const response = await api.get("/reviews/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReview = async (id) => {
  try {
    const response = await api.get(`/reviews/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReview = async (id, reviewData) => {
  try {
    const response = await api.put(`/reviews/${id}/`, reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (id) => {
    try {
        const response = await api.delete(`/reviews/${id}/`)
        return response.data
    } catch (error) {
        throw error
    }
}
