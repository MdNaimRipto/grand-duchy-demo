import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { TimerService } from "./timer.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Upload Book
const updateOrCreateTimer = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await TimerService.updateOrCreateTimer(payload, id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Timer Updated Successfully",
    data: result,
  });
});

// Get
const getUpcomingTime = catchAsync(async (req: Request, res: Response) => {
  const result = await TimerService.getUpcomingTime();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Time Fetched Successfully",
    data: result,
  });
});

export const TimerController = {
  updateOrCreateTimer,
  getUpcomingTime,
};
