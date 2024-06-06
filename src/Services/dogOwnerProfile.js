import api from "./apiConfig.js";

export const getOwner = async (id, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
  
  try {
    const response = await api.get(`/dog-owner-profiles/${id}`, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOwner = async (ownerData, accessToken) => {
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  try {
    const response = await api.post("/dog-owner-profiles/", ownerData, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
