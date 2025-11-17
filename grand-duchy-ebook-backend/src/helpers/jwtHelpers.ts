import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

const jwtVerify = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

const extractJwt = (token: string, secret: Secret): string | null => {
  try {
    const decoded = jwtVerify(token, secret);
    return decoded.id;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};

export const jwtHelpers = {
  createToken,
  jwtVerify,
  extractJwt,
};
