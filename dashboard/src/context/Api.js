import axios from "axios";

axios.defaults.withCredentials = true;
export const API = axios.create({
  baseURL: `https://api.yogprerna.com/api`,

  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: true,

});
