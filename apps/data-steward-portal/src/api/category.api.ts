export type CategoryData = {
  categoryId: string;
  name: string;
  description: string;
};

export const getAllCategory = async () => {
  const response = await fetch(`http://localhost:8626/api/category`);
  const data: CategoryData[] = await response.json();
  return data;
};
