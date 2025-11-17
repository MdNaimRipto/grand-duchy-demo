import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Books } from "../books/books.schema";
import { ISummary, ISummeryFilters } from "./summary.interface";
import { Summary } from "./summary.schema";
import {
  IGenericPaginationResponse,
  IPaginationOptions,
} from "../../../interface/pagination";
import { SummerySearchableFields } from "./summery.constant";
import { calculatePaginationFunction } from "../../../helpers/paginationHelpers";
import { SortOrder } from "mongoose";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";
import { Users } from "../users/users.schema";

const addSummary = async (summary: ISummary, token: string) => {
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

  const { actTitle, bookId, chapterTitle, episodeTitle } = summary;

  const isBookExists = await Books.findOne({ _id: bookId });
  if (!isBookExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found!");
  }

  const isActExists = await Books.findOne({
    _id: bookId,
    acts: {
      $elemMatch: {
        title: actTitle,
      },
    },
  });
  if (!isActExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Act not found!");
  }

  const isChapterExists = await Books.findOne({
    _id: bookId,
    acts: {
      $elemMatch: {
        title: actTitle,
        chapters: { $elemMatch: { title: chapterTitle } },
      },
    },
  });
  if (!isChapterExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Chapter not found!");
  }

  const isEpisodeExists = await Books.findOne({
    _id: bookId,
    acts: {
      $elemMatch: {
        title: actTitle,
        chapters: {
          $elemMatch: {
            title: chapterTitle,
            episodes: { $elemMatch: { title: episodeTitle } },
          },
        },
      },
    },
  });
  if (!isEpisodeExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Episode not found!");
  }

  const result = await Summary.create(summary);
  return result;
};

const getAllSummary = async (
  filters: ISummeryFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericPaginationResponse<ISummary[]>> => {
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: SummerySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  //
  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => {
        return { [field]: value };
      }),
    });
  }
  //
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePaginationFunction(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  //
  const checkAndCondition =
    andConditions?.length > 0 ? { $and: andConditions } : {};

  const result = await Summary.find(checkAndCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Summary.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// const getAllSummary = async () => {
//   const result = await Summary.find({});
//   return result;
// };

const getSummariesByBook = async ({
  bookId,
  actTitle,
  chapterTitle,
  episodeTitle,
}: {
  bookId: string;
  actTitle: string;
  chapterTitle: string;
  episodeTitle: string;
}) => {
  console.log({ bookId, actTitle, chapterTitle, episodeTitle });

  const findSummaries = await Summary.find({
    bookId,
    actTitle,
    chapterTitle,
    episodeTitle,
  });
  return findSummaries;
};

const updateSummary = async (
  summaryId: string,
  payload: Partial<ISummary>,
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

  const result = await Summary.findOneAndUpdate({ _id: summaryId }, payload, {
    new: true,
  });
  return result;
};

const deleteSummary = async (summaryId: string, token: string) => {
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

  const result = await Summary.findByIdAndDelete(summaryId);
  return result;
};

export const SummaryService = {
  addSummary,
  getAllSummary,
  getSummariesByBook,
  updateSummary,
  deleteSummary,
};
