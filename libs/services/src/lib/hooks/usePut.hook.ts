import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { getErrorMessage } from './usePost.hook';
import api from '../utils/interceptor.api';

interface ErrorResponse {
  message: string;
}

export const usePut = (endpoint: string) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const putData = async <T>(requestData: T) => {
    setLoading(true);
    setError('');
    console.log(error);
    try {
      const response = await api.put(endpoint, requestData);
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        setError(getErrorMessage(response));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<ErrorResponse>;

        setError((prevError) => {
          if (axiosError.response?.data.message) {
            return axiosError.response.data.message;
          } else {
            return axiosError.message;
          }
        });
      } else {
        setError((prevError) => err.message);
      }
      setLoading(false);
    }
    return null;
  };
  return { putData, isLoading, error };
};
