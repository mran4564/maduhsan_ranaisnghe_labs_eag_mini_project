import { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../utils/errors';
import api from '../utils/interceptor.api';

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
        setError(() => {
          if (err.response?.data.errors) {
            const errors = err.response?.data.errors;
            return errors[0].message;
          } else {
            const errorMessage = getErrorMessage(err.response!);
            return errorMessage;
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
