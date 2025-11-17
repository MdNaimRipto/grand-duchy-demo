import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { IQuote } from "./quote.interface";
import { Quote } from "./quote.schema";
import { Users } from "../users/users.schema";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const uploadQuote = async (payload: IQuote, token: string) => {
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

  const result = await Quote.create(payload);
  return result;
};

const getAllQuotes = async () => {
  const result = await Quote.find({});
  return result;
};

const getRandomQuote = async () => {
  const count = await Quote.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const result = await Quote.findOne().skip(randomIndex);
  return result;
};

const updateQuote = async (
  payload: Partial<IQuote>,
  quoteId: string,
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

  const result = await Quote.findOneAndUpdate({ _id: quoteId }, payload, {
    new: true,
  });
  return result;
};

const deleteQuote = async (quoteId: string, token: string) => {
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

  const result = await Quote.findOneAndDelete(
    { _id: quoteId },
    {
      new: true,
    },
  );
  return result;
};

export const QuoteService = {
  uploadQuote,
  getAllQuotes,
  getRandomQuote,
  updateQuote,
  deleteQuote,
};
