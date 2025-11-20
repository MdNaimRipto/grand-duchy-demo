export type linkedProvidersEnums = "CUSTOM" | "FACEBOOK" | "TWITTER" | "GOOGLE";
export type userTypesEnums = "ADMIN" | "USER";

export interface ICreateUser {
  userName: string;
  email: string;
}

export interface IUser {
  userName: string;
  email: string;
  fontSize: number;
  totalActive: number;
  userType: userTypesEnums;
}
