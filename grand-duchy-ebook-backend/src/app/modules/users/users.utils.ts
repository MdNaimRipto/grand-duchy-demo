import CryptoJS from "crypto-js";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import { IUser } from "./users.interface";

export function generateUID() {
  const uidLength = 20;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let uid = "user";

  for (let i = 0; i < uidLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uid += characters.charAt(randomIndex);
  }

  return uid;
}

export function encryptData(user: IUser) {
  const userData = {
    userName: user.userName,
    email: user.email,
    fontSize: user.fontSize,
    totalActive: user.totalActive,
    userType: user.userType,
  };

  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(userData),
    String(config.jwt_secret),
  ).toString();
  return encryptedData;
}

// Generate AuthToken
export const generateAuthToken = (user: any) => {
  const accessToken = jwtHelpers.createToken(
    {
      id: user._id,
    },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string,
  );

  const encryptedUserData = encryptData(user as any);

  return {
    token: accessToken,
    userData: encryptedUserData,
  };
};

// ! Do Not remove it
// export function decryptData(
//   encryptedData: string,
//   secretKey: string,
// ): IUserWithoutPassword {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData as IUserWithoutPassword;
// }
