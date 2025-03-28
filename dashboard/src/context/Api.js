import axios from "axios";

axios.defaults.withCredentials = true;
export const API = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,

});
