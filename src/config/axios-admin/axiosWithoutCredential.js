import { BASE_ADMIN_URL } from "@env"
import axios from 'axios';
axios.defaults.withCredentials = true;
//console.log(BASE_ADMIN_URL);
export const axiosInstance = axios.create({
  baseURL: BASE_ADMIN_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceFormData = axios.create({
  baseURL: BASE_ADMIN_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  },
});