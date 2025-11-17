import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ICharacter } from "./character.interface";
import { Character } from "./character.schema";
import { Users } from "../users/users.schema";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const uploadCharacter = async (payload: ICharacter, token: string) => {
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

  const result = await Character.create(payload);
  return result;
};

const getAllCharacters = async () => {
  const result = await Character.find({});
  return result;
};

const getRandomCharacter = async () => {
  const count = await Character.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const result = await Character.findOne().skip(randomIndex);
  return result;
};

const updateCharacter = async (
  payload: Partial<ICharacter>,
  id: string,
  token: string,
) => {
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

  const result = await Character.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCharacter = async (id: string, token: string) => {
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

  const result = await Character.findOneAndDelete(
    { _id: id },
    {
      new: true,
    },
  );
  return result;
};

export const CharacterService = {
  uploadCharacter,
  getAllCharacters,
  getRandomCharacter,
  updateCharacter,
  deleteCharacter,
};
