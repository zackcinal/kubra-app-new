import api from "./apiConfig.js";

export const getReminders = async () => {
  try {
    const response = await api.get("/reminders/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReminder = async (id) => {
  try {
    const response = await api.get(`/reminders/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateReminder = async (id, reminderData) => {
  try {
    const response = await api.put(`/reminders/${id}/`, reminderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReminder = async (id) => {
  try {
    const response = await api.delete(`/reminders/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
