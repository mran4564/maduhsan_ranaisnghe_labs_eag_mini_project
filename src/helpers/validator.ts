import { UserRoleEnum } from '../model/auth.model';

export const isValidStatus = (value: string) => {
  return Object.values(UserRoleEnum).includes(value);
};
