import { envConfig } from "@/configs/envConfig";
import CryptoJS from "crypto-js";

export function encryptData(data: any) {
  const encryptedData = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    String(envConfig.secret_key)
  ).toString();
  return encryptedData;
}

export const decryptData = (data: string) => {
  const secretKey = envConfig.secret_key;
  const bytes = CryptoJS.AES.decrypt(data.toString(), secretKey);
  const response = JSON.parse(bytes.toString(CryptoJS.enc.Utf8) as string);
  return response;
};
