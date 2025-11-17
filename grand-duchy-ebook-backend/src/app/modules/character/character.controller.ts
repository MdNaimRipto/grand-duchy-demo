import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { CharacterService } from "./character.service";
import { verifyAuthToken } from "../../../util/verifyAuthToken";

// Create ReadList
const uploadCharacter = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const token = verifyAuthToken(req);

  const result = await CharacterService.uploadCharacter(payload, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Character Uploaded Successfully",
    data: result,
  });
});

// Get Latest ReadList
const getAllCharacters = catchAsync(async (req: Request, res: Response) => {
  const result = await CharacterService.getAllCharacters();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Character's Fetched Successfully",
    data: result,
  });
});

// Get Random Character
const getRandomCharacter = catchAsync(async (req: Request, res: Response) => {
  const result = await CharacterService.getRandomCharacter();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Character Fetched Successfully",
    data: result,
  });
});

// Update
const updateCharacter = catchAsync(async (req: Request, res: Response) => {
  const { ...payload } = req.body;
  const { id } = req.params;
  const token = verifyAuthToken(req);

  console.log({ payload, id });

  const result = await CharacterService.updateCharacter(payload, id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Character Updated Successfully",
    data: result,
  });
});

// Delete
const deleteCharacter = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = verifyAuthToken(req);

  const result = await CharacterService.deleteCharacter(id, token);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Character Deleted Successfully",
    data: result,
  });
});

export const CharacterController = {
  uploadCharacter,
  getAllCharacters,
  getRandomCharacter,
  updateCharacter,
  deleteCharacter,
};
