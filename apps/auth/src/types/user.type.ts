export const UserRoleEnum = {
  DATA_STEWARD: 'DATA_STEWARD',
  CUSTOMER: 'CUSTOMER',
  SUPPLIER: 'SUPPLIER',
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
