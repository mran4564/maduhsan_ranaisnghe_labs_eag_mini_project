import { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import api from '../utils/interceptor.api';

export const useGet = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T>();

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      api
        .get(endpoint, {
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );

  const getData = () => {
    setLoading(true);
    api
      .get(endpoint, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });
  };

  return { data, error, isLoading, getData };
};
