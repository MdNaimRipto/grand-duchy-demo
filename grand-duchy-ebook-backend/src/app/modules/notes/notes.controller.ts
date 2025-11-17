import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { verifyAuthToken } from "../../../util/verifyAuthToken";
import { NoteService } from "./notes.service";

// Create ReadList
const uploadNote = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await NoteService.uploadNote(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Note Uploaded Successfully",
    data: result,
  });
});

// Get Latest ReadList
const getAllNotes = catchAsync(async (req: Request, res: Response) => {
  const token = verifyAuthToken(req);
  const result = await NoteService.getAllNotes(token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Note's Fetched Successfully",
    data: result,
  });
});

// Get Random Note
const getLatestNote = catchAsync(async (req: Request, res: Response) => {
  const result = await NoteService.getLatestNote();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Note Fetched Successfully",
    data: result,
  });
});

// Update
const updateNote = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await NoteService.updateNote(payload, id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Note Updated Successfully",
    data: result,
  });
});

// Delete
const deleteNote = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await NoteService.deleteNote(id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Note Deleted Successfully",
    data: result,
  });
});

export const NoteController = {
  uploadNote,
  getAllNotes,
  getLatestNote,
  updateNote,
  deleteNote,
};
