import { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../utils/errors';
import api from '../utils/interceptor.api';

export const usePatch = (endpoint: string) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const postData = async <T>(requestData: T) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.patch(endpoint, requestData);
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
  return { postData, isLoading, error };
};
