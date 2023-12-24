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
  ADMIN: 'DATA_STEWARD',
  CUSTOMER: 'CUSTOMER',
  SUPPLIER: 'SUPPLIER',
};

export const cognitoCustomAttributes = {
  role: 'custom:role',
  userId: 'custom:userId',
};
