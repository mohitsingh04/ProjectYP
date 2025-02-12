import axios from "axios";

axios.defaults.withCredentials = true;
// export const accessToken = localStorage.getItem("accessToken");
export const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    withCredentials: true,
  },
});
