import {
  loadToken,
  REFRESH_TOKEN_API,
  setRefreshData,
} from '@b2b-app-mfe/services';
import axios from 'axios';
import { redirect } from 'react-router-dom';

const API = axios.create({
  baseURL: 'http://localhost:8626',
});

// Add a request interceptor
API.interceptors.request.use(
  (config) => {
    const { idToken } = loadToken();
    console.log(idToken);
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = loadToken();
        const response = await axios.post(REFRESH_TOKEN_API, {
          refreshToken,
        });
        const { refresh_token, id_token } = response.data;
        if (refresh_token && id_token) {
          setRefreshData(refresh_token, id_token);
        }
        originalRequest.headers.Authorization = `Bearer ${id_token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        redirect('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default API;
