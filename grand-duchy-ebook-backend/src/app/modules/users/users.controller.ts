import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./users.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Check User Exists
const providerLogin = catchAsync(async (req: Request, res: Response) => {
  const { userInfo, authMethod } = req.body;

  const result = await UserService.providerLogin(userInfo, authMethod);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Login Successful",
    data: result,
  });
});

// Update Font
const updateFont = catchAsync(async (req: Request, res: Response) => {
  const { email, fontSize } = req.body;

  const result = await UserService.updateFont(email, fontSize);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Font Size Updated Successfully.",
    data: result,
  });
});

// Get All
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const result = await UserService.getAllUsers(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users Retrieved Successfully.",
    data: result,
  });
});

// Update Total active
const updateTotalActiveTime = catchAsync(
  async (req: Request, res: Response) => {
    const token = verifyAuthToken(req);
    const { email } = req.query;

    const result = await UserService.updateTotalActiveTime(
      email as string,
      token,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Total Active Updated Successfully.",
      data: result,
    });
  },
);

// Get Total time
const getTotalActiveTime = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await UserService.getTotalActiveTime(email as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Total Active Time Retrieved Successfully.",
    data: result,
  });
});

export const UserController = {
  providerLogin,
  updateFont,
  getAllUsers,
  updateTotalActiveTime,
  getTotalActiveTime,
};
