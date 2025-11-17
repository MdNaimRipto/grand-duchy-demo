"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAuthToken = void 0;
exports.generateUID = generateUID;
exports.encryptData = encryptData;
const crypto_js_1 = __importDefault(require("crypto-js"));
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
function generateUID() {
    const uidLength = 20;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let uid = "user";
    for (let i = 0; i < uidLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uid += characters.charAt(randomIndex);
    }
    return uid;
}
function encryptData(user) {
    const userData = {
        userName: user.userName,
        email: user.email,
        fontSize: user.fontSize,
        totalActive: user.totalActive,
        userType: user.userType,
    };
    const encryptedData = crypto_js_1.default.AES.encrypt(JSON.stringify(userData), String(config_1.default.jwt_secret)).toString();
    return encryptedData;
}
// Generate AuthToken
const generateAuthToken = (user) => {
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: user._id,
    }, config_1.default.jwt_secret, config_1.default.jwt_expires_in);
    const encryptedUserData = encryptData(user);
    return {
        token: accessToken,
        userData: encryptedUserData,
    };
};
exports.generateAuthToken = generateAuthToken;
// ! Do Not remove it
// export function decryptData(
//   encryptedData: string,
//   secretKey: string,
// ): IUserWithoutPassword {
//   const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
//   const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//   return decryptedData as IUserWithoutPassword;
// }
