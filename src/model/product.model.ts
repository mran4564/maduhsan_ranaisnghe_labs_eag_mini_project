export interface ProductCreateDTO {
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  stockCount: string;
  imageUrl: string;
  brandName: string;
  instock: boolean;
  price: number;
  isApproved?: boolean;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  stockCount?: string;
  imageUrl: string;
  price?: number;
  inStock: true;
}

export interface ProductResponse {
  productId: string;
  name: string;
  description: string;
  supplierId: string;
  categoryId: string;
  stockCount: string;
  imageUrl: string;
  brandName: string;
  instock: boolean;
  price: number;
}
