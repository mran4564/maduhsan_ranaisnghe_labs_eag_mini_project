import { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../utils/errors';

export const usePost = (endpoint: string) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const postData = async <T>(requestData: T) => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(endpoint, requestData);
      setLoading(false);
      if (response.data) {
        return response.data;
      } else {
        setError(getErrorMessage(response));
      }
      controller.abort();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      controller.abort();
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
