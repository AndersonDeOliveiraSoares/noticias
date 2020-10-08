import axios from "axios";
import { getToken } from "./auth";

import {BASE_URL} from '../resources/constants'

const api = axios.create({
  baseURL: BASE_URL
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;