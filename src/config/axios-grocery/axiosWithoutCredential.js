import { GROCERY_ADMIN_URL } from "@env"
import axios from 'axios';
axios.defaults.withCredentials = true;
console.log(GROCERY_ADMIN_URL);
export const axiosInstanceGrocery = axios.create({
  baseURL: GROCERY_ADMIN_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export const axiosInstanceFormDataGrocery = axios.create({
  baseURL: GROCERY_ADMIN_URL,
  headers: {
    'Accept': '*/*',
    'Content-Type': 'multipart/form-data'
  },
});
