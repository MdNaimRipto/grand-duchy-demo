import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { QuoteService } from "./quote.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Create ReadList
const uploadQuote = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await QuoteService.uploadQuote(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quote Uploaded Successfully",
    data: result,
  });
});

// Get Latest ReadList
const getAllQuotes = catchAsync(async (req: Request, res: Response) => {
  const result = await QuoteService.getAllQuotes();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quote's Fetched Successfully",
    data: result,
  });
});

// Get Random Quote
const getRandomQuote = catchAsync(async (req: Request, res: Response) => {
  const result = await QuoteService.getRandomQuote();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quote Fetched Successfully",
    data: result,
  });
});

// Update
const updateQuote = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await QuoteService.updateQuote(payload, id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quote Updated Successfully",
    data: result,
  });
});

// Delete
const deleteQuote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await QuoteService.deleteQuote(id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Quote Deleted Successfully",
    data: result,
  });
});

export const QuoteController = {
  uploadQuote,
  getAllQuotes,
  getRandomQuote,
  updateQuote,
  deleteQuote,
};
