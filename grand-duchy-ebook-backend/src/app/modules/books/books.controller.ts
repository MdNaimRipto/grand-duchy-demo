import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { BooksService } from "./books.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Upload Book
const uploadBook = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const { ...payload } = req.body;

  const result = await BooksService.uploadBook(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Uploaded Successfully",
    data: result,
  });
});

// Get All Books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getAllBooks();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Books",
    data: result,
  });
});

// Get Book By Id
const getBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { epIndex } = req.query;

  const result = await BooksService.getBookById(id, Number(epIndex));

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book By Id",
    data: result,
  });
});

// Get Episode Count By Id
const getEpisodeCountById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BooksService.getEpisodeCountById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book By Id",
    data: result,
  });
});

// Update Book
const updateBook = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const { ...payload } = req.body;

  const result = await BooksService.updateBook(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Updated Successfully",
    data: result,
  });
});

// Update Book
const addActToBook = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const { id } = req.params;
  const { ...payload } = req.body;

  const result = await BooksService.addActToBook(id, payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Act Added Successfully",
    data: result,
  });
});

// Add Chapter to book
const addChapterToAct = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const { id } = req.params;
  const { actTitle } = req.query;
  const { ...payload } = req.body;

  console.log(payload);

  const result = await BooksService.addChapterToAct(
    id,
    actTitle as string,
    payload,
    token,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Chapter Added Successfully",
    data: result,
  });
});

// Add Episode to book
const addEpisodeToChapter = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { actTitle, chapterTitle } = req.query;
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await BooksService.addEpisodeToChapter(
    id,
    actTitle as string,
    chapterTitle as string,
    payload,
    token,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Episode Added Successfully",
    data: result,
  });
});

// Delete Book
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await BooksService.deleteBook(id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Book Deleted Successfully",
    data: result,
  });
});

// Get All Books
const getBooksTitle = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getBooksTitle();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All Books Title",
    data: result,
  });
});

// Get All Books
const getLatestEpisode = catchAsync(async (req: Request, res: Response) => {
  const result = await BooksService.getLatestEpisode();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Latest Episode",
    data: result,
  });
});

const getFormattedBookById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BooksService.getFormattedBookById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Formatted Book By Id",
    data: result,
  });
});

export const BooksController = {
  uploadBook,
  getAllBooks,
  getBookById,
  getEpisodeCountById,
  updateBook,
  addActToBook,
  addChapterToAct,
  addEpisodeToChapter,
  deleteBook,
  getBooksTitle,
  getLatestEpisode,
  getFormattedBookById,
};
