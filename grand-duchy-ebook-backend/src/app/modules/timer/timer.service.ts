import { Secret } from "jsonwebtoken";
import config from "../../../config/config";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { ITimer } from "./timer.interface";
import { Timer } from "./timer.schema";
import { Users } from "../users/users.schema";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const updateOrCreateTimer = async (
  payload: ITimer,
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

  let result = await Timer.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const getUpcomingTime = async () => {
  const result = await Timer.find({});
  return result;
};

export const TimerService = {
  updateOrCreateTimer,
  getUpcomingTime,
};
