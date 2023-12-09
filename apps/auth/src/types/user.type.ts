export const UserRoleEnum = {
  ADMIN: 'Admin',
  CUSTOMER: 'Customer',
  SUPPLIER: 'Supplier',
};

export interface UserCreateDTO {
  email: string;
  password: string;
  name: string;
  role: string;
}

export interface UserSigninDto {
  email: string;
  password: number;
}
