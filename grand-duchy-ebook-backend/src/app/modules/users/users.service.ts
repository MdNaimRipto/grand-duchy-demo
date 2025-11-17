import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import {
  IAuthUser,
  ICheckUserExists,
  IUser,
  linkedProvidersEnums,
} from "./users.interface";
import { Users } from "./users.schema";
import { generateAuthToken, generateUID } from "./users.utils";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";

//* Provider Login
const providerLogin = async (
  payload: IUser,
  authMethod: linkedProvidersEnums,
): Promise<IAuthUser> => {
  const { email } = payload;

  // Check if user exists
  const isExistsUser = await Users.findOne({ email });

  // If user exists
  if (isExistsUser) {
    const linkedProviders = isExistsUser.linkedProviders;

    // If the provider is not linked, link it
    if (!linkedProviders.includes(authMethod)) {
      linkedProviders.push(authMethod);
      const updatedUser = await Users.findOneAndUpdate(
        { email },
        { $set: { linkedProviders } },
        {
          new: true,
        },
      );
      return generateAuthToken(updatedUser as any);
    }

    // If the provider is already linked, return the auth token
    return generateAuthToken(isExistsUser as any);
  }

  // If user doesn't exist, create a new one
  const uid = generateUID();
  const isUIDExists = await Users.findOne({ uid: uid });

  if (isUIDExists) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Something went wrong! Please try again",
    );
  }

  // Set the UID and linked providers
  payload.uid = uid as string;
  payload.linkedProviders = [authMethod];

  const user = await Users.create(payload);

  return generateAuthToken(user as any);
};

// * Update Font
const updateFont = async (
  email: string,
  fontSize: number,
): Promise<IAuthUser> => {
  const user = await Users.findOneAndUpdate(
    { email },
    { fontSize },
    { new: true },
  );
  return generateAuthToken(user as any);
};

const getAllUsers = async (token: string) => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const userId = jwtHelpers.extractJwt(token, config.jwt_secret as Secret);

  const user = await Users.findOne({ _id: userId });

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must have to be admin to take this action",
    );
  }

  if (user.userType !== "ADMIN") {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must have to be admin to see the user details",
    );
  }

  const result = await Users.find({}).select("userName email totalActive");
  return result;
};

// * Update Time
const updateTotalActiveTime = async (
  email: string,
  token: string,
): Promise<null> => {
  jwtHelpers.jwtVerify(token, config.jwt_secret as Secret);

  const userId = jwtHelpers.extractJwt(token, config.jwt_secret as Secret);

  const user = await Users.findOne({ _id: userId });

  if (!user) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must have to be admin to take this action",
    );
  }

  if (user.userType !== "ADMIN") {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "User must have to be admin to see the user details",
    );
  }

  const isExistsUser = await Users.findOne({ email });
  if (!isExistsUser) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exists!");
  }

  const updateTime = 5 * 60 * 1000;

  const totalActiveTime = isExistsUser.totalActive + updateTime;

  await Users.findOneAndUpdate(
    { email },
    { totalActive: totalActiveTime },
    { new: true },
  );
  return null;
};

const getTotalActiveTime = async (email: string) => {
  const users = await Users.find({});
  const allUsersTotalActiveTime = users.reduce(
    (acc, user) => acc + user.totalActive,
    0,
  );

  const loggedInUserActiveTime = await Users.findOne({ email }).select(
    "totalActive",
  );

  return {
    allUsersTotalActiveTime,
    loggedInUserActiveTime,
  };
};

export const UserService = {
  providerLogin,
  updateFont,
  getAllUsers,
  updateTotalActiveTime,
  getTotalActiveTime,
};
