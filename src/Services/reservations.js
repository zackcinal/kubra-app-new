import api from "./apiConfig.js";

export const getReservations = async () => {
  try {
    const response = await api.get("/reservations/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReservation = async (id) => {
  try {
    const response = await api.get(`/reservations/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserReservations = async (userId) => {
  try {
    const response = await api.get(`/user_reservations/`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const makeReservation = async (reservationData) => {
  try {
    const response = await api.post("/reservations/", reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReservation = async (id, reservationData) => {
  try {
    const response = await api.put(`/reservations/${id}/`, reservationData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await api.delete(`/reservations/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
