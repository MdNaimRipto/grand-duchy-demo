export type linkedProvidersEnums = "CUSTOM" | "FACEBOOK" | "TWITTER" | "GOOGLE";
export type userTypesEnums = "ADMIN" | "USER";

export interface IUser {
  userName: string;
  email: string;
  uid: string;
  linkedProviders: Array<linkedProvidersEnums>;
  userType: userTypesEnums;
  fontSize: number;
  totalActive: number;
}

export interface ICheckUserExists {
  authMethod: linkedProvidersEnums;
  email: string;
}

export interface IAuthUser {
  token: string;
  userData: string;
}
