import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://localhost:3000/",
});

axiosInstance.interceptors.request.use(
    (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
},
(error) => Promise.reject(error)
);

export default axiosInstance;