import api from "./apiConfig.js";

export const getDogs = async (accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await api.get("/dog-profiles/", config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDog = async (userId, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await api.get(`/dog-profiles/owner/${userId}/`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDog = async (dogData, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await api.post("/dog-profiles/", dogData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateDog = async (id, dogData, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  console.log(id)
  try {
    const response = await api.put(`/dog-profiles/${id}/`, dogData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteDog = async (dogId, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await api.delete(`/dog-profiles/${dogId}/`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
