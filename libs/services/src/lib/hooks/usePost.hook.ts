import { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';

export interface ErrorResponse {
  message: string;
}

export const usePost = (endpoint: string) => {
  const [error, setError] = useState<string>('');
  const [isLoading, setLoading] = useState(false);

  const postData = async <T>(requestData: T) => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    console.log(error);
    try {
      const response = await axios.post(endpoint, requestData);
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
        return response.data;
      } else {
        setError(getErrorMessage(response));
      }
      controller.abort();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      controller.abort();

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
  return { postData, isLoading, error };
};

export const getErrorMessage = (response: AxiosResponse) => {
  if (!response || !response.status) {
    // If there is no status, assume a timeout or no server response
    return 'No Server Response';
  }
  switch (response.status) {
    case 400:
      return 'Bad Request';
    case 401:
      return 'Unauthorized';
    case 403:
      return 'Forbidden';
    case 404:
      return 'Not Found';
    case 500:
      return 'Internal Server Error';
    default:
      // Handle other status codes or provide a generic error message
      return 'An unexpected error occurred';
  }
};
