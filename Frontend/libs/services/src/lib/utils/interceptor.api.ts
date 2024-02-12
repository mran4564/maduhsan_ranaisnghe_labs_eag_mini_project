import axios from 'axios';
import { REFRESH_TOKEN_API } from '../constants/api.constants';
import { loadToken, setRefreshData } from './sessionData.api';

// Create a global navigate function
let navigate: ((to: string) => void) | undefined;

// Set the navigate function when the component is mounted
export const setNavigate = (nav: (to: string) => void) => {
  navigate = nav;
};

const api = axios.create({
  baseURL: 'http://localhost:8626',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const { idToken } = loadToken();
    if (idToken) {
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, email } = loadToken();
        const response = await axios.post(REFRESH_TOKEN_API, {
          refreshToken,
          email,
        });
        const { refresh_token, id_token } = response.data;
        if (refresh_token && id_token) {
          setRefreshData(refresh_token, id_token);
        }
        originalRequest.headers.Authorization = `Bearer ${id_token}`;
        return axios(originalRequest);
      } catch (error) {
        console.log(error);
        navigate && navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
