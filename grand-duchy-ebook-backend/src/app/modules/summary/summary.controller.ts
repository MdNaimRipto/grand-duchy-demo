import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { SummaryService } from "./summary.service";
import { SummeryFilterableFields } from "./summery.constant";
import pick from "../../../shared/shared";
import { paginationFields } from "../../../constants/pagination.constant";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Upload Summary
const addSummary = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await SummaryService.addSummary(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Summary Added Successfully",
    data: result,
  });
});

// Get All Summary
const getAllSummary = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SummeryFilterableFields);
  const options = pick(req.query, paginationFields);
  const result = await SummaryService.getAllSummary(filters, options);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Summary",
    data: result,
  });
});

// Get Summary By Book
const getSummariesByBook = catchAsync(async (req: Request, res: Response) => {
  const { bookId, actTitle, chapterTitle, episodeTitle } = req.params;

  const result = await SummaryService.getSummariesByBook({
    bookId,
    actTitle,
    chapterTitle,
    episodeTitle,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Summary By Book",
    data: result,
  });
});

// Update Summary
const updateSummary = catchAsync(async (req: Request, res: Response) => {
  const { summaryId } = req.params;
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await SummaryService.updateSummary(summaryId, payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Summary Updated Successfully",
    data: result,
  });
});

// Delete Summary
const deleteSummary = catchAsync(async (req: Request, res: Response) => {
  const { summaryId } = req.params;
  const token = verifyAuthToken(req);

  const result = await SummaryService.deleteSummary(summaryId, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Summary Deleted Successfully",
    data: result,
  });
});

export const SummaryController = {
  addSummary,
  getAllSummary,
  getSummariesByBook,
  updateSummary,
  deleteSummary,
};
