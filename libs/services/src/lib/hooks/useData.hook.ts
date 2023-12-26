import { AxiosRequestConfig, CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import api from '../utils/interceptor.api';

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

export const useData = <T>(
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

  const handlePagination = (newPageNo: number, status: string) => {
    const configs: AxiosRequestConfig = {
      ...requestConfig,
      params: {
        page: newPageNo,
        status: status,
      },
    };
    setData([]);
    setLoading(true);
    api
      .get<FetchResponse<T>>(endpoint, {
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
  };

  useEffect(
    () => {
      setData([]);
      setLoading(true);
      api
        .get<FetchResponse<T>>(endpoint, {
          ...requestConfig,
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );

  return { data, pageData, error, isLoading, handlePagination };
};
