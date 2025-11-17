import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { Users } from "../users/users.schema";
import {
  IAct,
  IBookDetails,
  IBooks,
  IChapter,
  IEpisode,
  IUpdateBook,
} from "./books.interface";
import { Books } from "./books.schema";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config/config";
import { Secret } from "jsonwebtoken";

const uploadBook = async (
  payload: IBooks,
  token: string,
): Promise<IBooks | null> => {
  const book = payload;

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

  if (!book.title || !book.prologue) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book must have a title and prologue.",
    );
  }

  // Ensure the book has at least one act (basic validation)
  if (!book.acts || book.acts.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Book must have at least one act.",
    );
  }

  // Ensure each act has at least one chapter and each chapter has at least one episode
  for (const act of book.acts) {
    if (!act.chapters || act.chapters.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Act "${act.title}" must have at least one chapter.`,
      );
    }

    for (const chapter of act.chapters) {
      if (!chapter.episodes || chapter.episodes.length === 0) {
        throw new ApiError(
          httpStatus.BAD_REQUEST,
          `Chapter "${chapter.title}" must have at least one episode.`,
        );
      }

      for (const episode of chapter.episodes) {
        episode.createdAt = new Date(); // Set the createdAt date for each episode
      }
    }
  }

  const result = await Books.create(book);
  return result;
};

const getAllBooks = async (): Promise<IBooks[]> => {
  const result = await Books.find();
  return result;
};

const getBookById = async (
  id: string,
  epIndex: number,
): Promise<IBookDetails | null> => {
  const book = await Books.findOne({ _id: id });

  if (!book) {
    return null;
  }

  // Prepare the result object
  const result = {
    title: book.title,
    prologue: book.prologue,
    image: book.image,
    episodes: [] as Array<{
      actTitle: string;
      chapterTitle: string;
      episodeTitle: string;
      content: string;
    }>,
  };

  // Check if epIndex is 0; if so, return empty episodes
  if (epIndex > 0) {
    let episodeCount = 0;

    // Iterate through each act, chapter, and episode to get the required episodes
    for (const act of book.acts) {
      for (const chapter of act.chapters) {
        for (const episode of chapter.episodes) {
          episodeCount++;

          // If the current episode number matches epIndex, add it to the result
          if (episodeCount <= epIndex) {
            result.episodes.push({
              actTitle: act.title,
              chapterTitle: chapter.title,
              episodeTitle: episode.title,
              content: episode.content,
            });
          }
        }
      }
    }
  }

  return result;
};

const getFormattedBookById = async (
  id: string,
): Promise<IBookDetails | null> => {
  const book = await Books.findOne({ _id: id });

  if (!book) {
    return null;
  }

  // Prepare the result object
  const result = {
    title: book.title,
    prologue: book.prologue,
    image: book.image,
    episodes: [] as Array<{
      actTitle: string;
      chapterTitle: string;
      episodeTitle: string;
      content: string;
    }>,
  };

  // Iterate through each act, chapter, and episode to get the required episodes
  for (const act of book.acts) {
    for (const chapter of act.chapters) {
      for (const episode of chapter.episodes) {
        result.episodes.push({
          actTitle: act.title,
          chapterTitle: chapter.title,
          episodeTitle: episode.title,
          content: episode.content,
        });
      }
    }
  }
  return result;
};

const getEpisodeCountById = async (id: string): Promise<number> => {
  const book = await Books.findOne({ _id: id });

  if (!book) {
    return 0; // Return 0 if the book is not found
  }

  let episodeCount = 0;

  // Iterate through each act, chapter, and episode to count them
  for (const act of book.acts) {
    for (const chapter of act.chapters) {
      for (const episode of chapter.episodes) {
        episodeCount++; // Increment the episode count
      }
    }
  }

  return episodeCount; // Return the total number of episodes
};

const updateBook = async (
  payload: IUpdateBook,
  token: string,
): Promise<IBooks | null> => {
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

  const { bookId, actIndex, chapterIndex, episodeIndex, updatePayload } =
    payload;

  const updateFields: any = {};

  console.log({ payload });

  // Check if the update is for a top-level field like title or prologue
  if (
    actIndex === undefined &&
    chapterIndex === undefined &&
    episodeIndex === undefined
  ) {
    if (updatePayload.title) {
      updateFields.title = updatePayload.title;
    }
    if (updatePayload.prologue) {
      updateFields.prologue = updatePayload.prologue;
    }
    if (updatePayload.image) {
      updateFields.image = updatePayload.image;
    }
  }

  if (actIndex !== undefined) {
    if (chapterIndex !== undefined) {
      if (episodeIndex !== undefined) {
        updateFields[
          `acts.${actIndex}.chapters.${chapterIndex}.episodes.${episodeIndex}`
        ] = {
          ...updatePayload,
        };
      } else {
        updateFields[`acts.${actIndex}.chapters.${chapterIndex}`] = {
          ...updatePayload,
        };
      }
    } else {
      updateFields[`acts.${actIndex}`] = {
        ...updatePayload,
      };
    }
  } else {
    if (updatePayload.acts) {
      updateFields.acts = updatePayload.acts;
    }
  }

  // Perform the update in MongoDB
  const result = await Books.findOneAndUpdate(
    { _id: bookId },
    { $set: updateFields },
    { new: true },
  );

  return result;
};

const addActToBook = async (
  bookId: string,
  payload: IAct,
  token: string,
): Promise<IBooks | null> => {
  const act = payload;

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

  // Validate Act Structure
  if (!act.chapters || act.chapters.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "An Act must have at least one Chapter.",
    );
  }

  for (const chapter of act.chapters) {
    if (!chapter.episodes || chapter.episodes.length === 0) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Chapter "${chapter.title}" must have at least one Episode.`,
      );
    }

    for (const episode of chapter.episodes) {
      episode.createdAt = new Date(); // Set the createdAt date for each episode
    }
  }

  // Push the new Act into the existing book
  const updatedBook = await Books.findOneAndUpdate(
    { _id: bookId },
    { $push: { acts: act } },
    { new: true },
  );

  return updatedBook;
};

const addChapterToAct = async (
  bookId: string,
  actTitle: string,
  payload: IChapter,
  token: string,
): Promise<IBooks | null> => {
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

  const chapter = payload;

  // Validate Admin
  // const isAdmin = await Users.findOne({ _id: adminId });
  // if (!isAdmin || isAdmin.uid !== config.admin_uid) {
  //   throw new ApiError(
  //     httpStatus.UNAUTHORIZED,
  //     "Unauthorized User! Only Admins can add chapters.",
  //   );
  // }

  // Validate Chapter Structure
  if (!chapter.episodes || chapter.episodes.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Chapter "${chapter.title}" must have at least one Episode.`,
    );
  }

  for (const episode of chapter.episodes) {
    episode.createdAt = new Date(); // Set the createdAt date for each episode
  }

  // Add Chapter to the Correct Act
  const updatedBook = await Books.findOneAndUpdate(
    { _id: bookId, "acts.title": actTitle }, // Find the correct book & act
    { $push: { "acts.$.chapters": chapter } }, // Push chapter into the correct act
    { new: true },
  );

  if (!updatedBook) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book or Act not found.");
  }

  return updatedBook;
};

const addEpisodeToChapter = async (
  bookId: string,
  actTitle: string,
  chapterTitle: string,
  payload: IEpisode,
  token: string,
): Promise<IBooks | null> => {
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

  // Validate Episode Structure
  if (!payload.title || !payload.content) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Episode must have a title and content.",
    );
  }

  // Find the book and get the index of the act and chapter
  const book = await Books.findOne({ _id: bookId });

  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, "Book not found.");
  }

  // Find the correct act
  const actIndex = book.acts.findIndex(act => act.title === actTitle);
  if (actIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Act not found.");
  }

  // Find the correct chapter within the act
  const chapterIndex = book.acts[actIndex].chapters.findIndex(
    chapter => chapter.title === chapterTitle,
  );
  if (chapterIndex === -1) {
    throw new ApiError(httpStatus.NOT_FOUND, "Chapter not found.");
  }

  payload.createdAt = new Date();

  // Use the found indices to update the correct nested array
  const updateQuery = {
    [`acts.${actIndex}.chapters.${chapterIndex}.episodes`]: payload, // Dynamically update the path
  };

  const updatedBook = await Books.findOneAndUpdate(
    { _id: bookId },
    { $push: updateQuery },
    { new: true },
  );

  if (!updatedBook) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Failed to update book, act, or chapter.",
    );
  }

  return updatedBook;
};

const deleteBook = async (
  id: string,
  token: string,
): Promise<IBooks | null> => {
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

  const result = await Books.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

const getBooksTitle = async () => {
  const result = await Books.find().select("title");
  return result;
};

const getLatestEpisode = async (): Promise<IEpisode | null> => {
  const latestBook = await Books.findOne().sort({ updatedAt: -1 });

  if (!latestBook) {
    return null;
  }

  let latest: IEpisode | null = null;

  for (const act of latestBook.acts) {
    for (const chapter of act.chapters) {
      for (const episode of chapter.episodes) {
        if (
          !latest ||
          new Date(episode.createdAt).getTime() >
            new Date(latest.createdAt).getTime()
        ) {
          latest = episode;
        }
      }
    }
  }

  return latest;
};

export const BooksService = {
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
