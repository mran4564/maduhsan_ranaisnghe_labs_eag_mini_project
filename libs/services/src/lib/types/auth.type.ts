export type AuthDetails = {
  userId: string;
  userRole: string;
  idToken: string;
  refreshToken: string;
  email: string;
};

export interface UserData {
  userId: string | null;
  userRole: string | null;
  email: string | null;
}
