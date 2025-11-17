import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Users } from "../users/users.schema";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { INote } from "./notes.interface";
import { Notes } from "./notes.schema";

const uploadNote = async (payload: INote, token: string) => {
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

  const result = await Notes.create(payload);
  return result;
};

const getAllNotes = async (token: string) => {
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
  const result = await Notes.find({});
  return result;
};

const getLatestNote = async () => {
  const result = await Notes.findOne().sort({ createdAt: -1 });
  return result;
};

const updateNote = async (
  payload: Partial<INote>,
  NoteId: string,
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

  const result = await Notes.findOneAndUpdate({ _id: NoteId }, payload, {
    new: true,
  });
  return result;
};

const deleteNote = async (NoteId: string, token: string) => {
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

  const result = await Notes.findOneAndDelete(
    { _id: NoteId },
    {
      new: true,
    },
  );
  return result;
};

export const NoteService = {
  uploadNote,
  getAllNotes,
  getLatestNote,
  updateNote,
  deleteNote,
};
