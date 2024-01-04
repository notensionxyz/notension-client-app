import { MEDICINE_ADMIN_URL } from "@env"
import axios from 'axios';
axios.defaults.withCredentials = true;
console.log(MEDICINE_ADMIN_URL);
export const axiosInstanceMedicine = axios.create({
  baseURL: MEDICINE_ADMIN_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceFormDataMedicine = axios.create({
  baseURL: MEDICINE_ADMIN_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  },
});