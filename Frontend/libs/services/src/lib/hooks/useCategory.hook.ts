import { CATEGORY_API } from '../constants/api.constants';
import { CategoryData, CategoryQuery } from '../types/category.type';
import { useData } from './useData.hook';

export const useCategory = (queryParams: CategoryQuery) =>
  useData<CategoryData>(
    CATEGORY_API,
    {
      params: {},
    },
    []
  );
