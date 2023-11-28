export interface ProductCreateDTO {
  name: string;
  description: string;
  price: number;
}

export interface ProductUpdateDTO {
  name?: string;
  description?: string;
  price?: number;
}
