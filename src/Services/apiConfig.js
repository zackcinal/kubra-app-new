import axios from "axios";

const getToken = () => {
  return new Promise((resolve) => {
    const token = localStorage.getItem("token");
    resolve(token ? `Bearer ${token}` : null);
  });
};

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://dog-walks-by-kubra-c0f24118e28d.herokuapp.com"
      : "http://127.0.0.1:8000/",
});

api.interceptors.request.use(
  async function (config) {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    console.log("Request error: ", error);
    return Promise.reject(error);
  }
);

export default api;
