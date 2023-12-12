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

export const UserRoleEnum = {
  ADMIN: 'Data_Steward',
  CUSTOMER: 'Customer',
  SUPPLIER: 'Supplier',
};
