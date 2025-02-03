import axios from "axios";

export const accessToken = localStorage.getItem("accessToken");
export const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        authorization: `Bearer ${accessToken}`,
    },
});