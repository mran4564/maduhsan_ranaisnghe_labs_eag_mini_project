import { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig, CanceledError } from 'axios';
import { CART_API } from '../constants/api.constants';
import { CartApi, updateCartItemRequestDto } from '../types/cart.type';
import { CreateOrderRequest, OrderApi } from '../types/order.type';
import { getErrorMessage } from '../utils/errors';
import api from '../utils/interceptor.api';

export const UseCart = <T>(
  requestConfig?: AxiosRequestConfig,
  deps?: unknown[]
) => {
  const cartEndpoint = CART_API;

  const [data, setData] = useState<T>();

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      setLoading(true);
      api
        .get(cartEndpoint, {
          ...requestConfig,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          if (err instanceof CanceledError) return;
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
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps ? [...deps] : []
  );

  const getData = () => {
    setLoading(true);
    api
      .get(cartEndpoint, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
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
      });
  };

  const updateItem = (
    cartItemId: string,
    updateCart: updateCartItemRequestDto
  ) => {
    setLoading(true);
    api
      .patch(CartApi.UpdateCartItem(cartItemId), updateCart, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
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
      });
  };

  const deleteItem = (cartItemId: string) => {
    setLoading(true);
    api
      .delete(CartApi.UpdateCartItem(cartItemId), {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
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
      });
  };

  const removeCart = (cartItemId: string) => {
    setLoading(true);
    api
      .delete(cartEndpoint, {
        ...requestConfig,
      })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
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
      });
  };

  const postOrder = async (requestData: CreateOrderRequest) => {
    const endpoint = OrderApi.createOrder;
    setLoading(true);
    setError('');
    console.log(error);
    try {
      const response = await api.post(endpoint, requestData);
      setLoading(false);
      if (response.status === 200 || response.status === 201) {
        return response.data.data;
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

  return {
    data,
    error,
    isLoading,
    getData,
    updateItem,
    deleteItem,
    removeCart,
    postOrder,
  };
};
