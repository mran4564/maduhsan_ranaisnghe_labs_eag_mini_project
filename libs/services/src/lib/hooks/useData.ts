import axios, { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState } from 'react';

interface FetchResponse<T> {
  content: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
}

export interface PageData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements?: number;
}

const useData = <T>(
  endpoint: string,
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [pageData, setPageData] = useState<PageData>({
    pageSize: 0,
    totalPages: 0,
    currentPage: 0,
  });
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handlePagination = (newPageNo: number) => {
    const controller = new AbortController();
    const configs: AxiosRequestConfig = {
      ...requestConfig,
      params: {
        page: newPageNo,
      },
    };
    setLoading(true);
    axios
      .get<FetchResponse<T>>(endpoint, {
        signal: controller.signal,
        ...configs,
      })
      .then((res) => {
        setData(res.data.content);
        setPageData({
          pageSize: res.data.pageSize,
          totalPages: res.data.totalPages,
          currentPage: res.data.currentPage,
        });
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  };

  useEffect(
    () => {
      const controller = new AbortController();

      setLoading(true);
      axios
        .get<FetchResponse<T>>(endpoint, {
          signal: controller.signal,
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data.content);
          setPageData({
            pageSize: res.data.pageSize,
            totalPages: res.data.totalPages,
            currentPage: res.data.currentPage,
          });
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
          setError(err.message);
          setLoading(false);
        });

      return () => controller.abort();
    },
    deps ? [...deps] : []
  );

  return { data, pageData, error, isLoading, handlePagination };
};

export default useData;
