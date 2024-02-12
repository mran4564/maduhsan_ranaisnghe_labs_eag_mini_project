import { AxiosResponse } from 'axios';

export const getErrorMessage = (response: AxiosResponse) => {
  if (!response || !response.status) {
    // If there is no status, assume a timeout or no server response
    return 'Unknown Error occurred';
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
      return 'Oops error occurred';
  }
};
