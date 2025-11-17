import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { ReadListService } from "./readlist.service";

// Create ReadList
const createReadList = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;

  const result = await ReadListService.createReadList(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Read list Updated Successfully",
    data: result,
  });
});

// Get Latest ReadList
const getLatestReadList = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.query;

  const result = await ReadListService.getLatestReadList(email as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Read list Fetched Successfully",
    data: result,
  });
});

// Get Read list details
const getReadListDetails = catchAsync(async (req: Request, res: Response) => {
  const { email, bookId } = req.query;

  const result = await ReadListService.getReadListDetails(
    email as string,
    bookId as string,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Read list Details Fetched Successfully",
    data: result,
  });
});

export const ReadListController = {
  createReadList,
  getLatestReadList,
  getReadListDetails,
};
