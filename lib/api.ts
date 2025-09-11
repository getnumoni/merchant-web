//lib/api.ts

import axios from "axios";
import { getAuthCookies } from "./cookies-utils";



// Create a function to get the API instance

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

//api interceptor
api.interceptors.request.use((config) => {

  //get token from persistent storage
  const token = getAuthCookies().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


//response interceptor
api.interceptors.response.use((response) => {
  return response;
});

export default api;