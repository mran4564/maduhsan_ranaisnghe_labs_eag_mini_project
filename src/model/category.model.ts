export interface CategoryResponseDTO {
  name: string;
  id: string;
  description?: string;
}

export interface CategoryCreateDto {
  name: string;
  description?: string;
}
