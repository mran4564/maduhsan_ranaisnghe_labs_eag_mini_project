import { CategoryData, useCategory } from '@b2b-app-mfe/services';
import { Box, Skeleton } from '@chakra-ui/react';
import { MenuItem, Sidebar } from '@b2b-app-mfe/common-components';
import { useEffect, useState } from 'react';

const CategorySideBar = () => {
  const { data, isLoading } = useCategory({});
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    const categoryItems: MenuItem[] = data
      ? data.map((item: CategoryData) => ({
          label: item.name,
          path: `/b2b-app/${item.categoryId}`,
        }))
      : [];

    setItems(categoryItems);
  }, [data]);

  return (
    <Box>
      {isLoading ? (
        <Box mx={7} mt={10} w="150px">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} height="20px" my="4" />
          ))}
        </Box>
      ) : (
        <Sidebar
          sideBarTitle="Categories"
          categoryItems={items}
          height="250px"
        />
      )}
    </Box>
  );
};

export default CategorySideBar;
