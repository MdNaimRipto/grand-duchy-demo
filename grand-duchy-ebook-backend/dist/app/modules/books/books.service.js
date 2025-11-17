"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_schema_1 = require("../users/users.schema");
const books_schema_1 = require("./books.schema");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const uploadBook = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const book = payload;
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    if (!book.title || !book.prologue) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book must have a title and prologue.");
    }
    // Ensure the book has at least one act (basic validation)
    if (!book.acts || book.acts.length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Book must have at least one act.");
    }
    // Ensure each act has at least one chapter and each chapter has at least one episode
    for (const act of book.acts) {
        if (!act.chapters || act.chapters.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Act "${act.title}" must have at least one chapter.`);
        }
        for (const chapter of act.chapters) {
            if (!chapter.episodes || chapter.episodes.length === 0) {
                throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Chapter "${chapter.title}" must have at least one episode.`);
            }
            for (const episode of chapter.episodes) {
                episode.createdAt = new Date(); // Set the createdAt date for each episode
            }
        }
    }
    const result = yield books_schema_1.Books.create(book);
    return result;
});
const getAllBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_schema_1.Books.find();
    return result;
});
const getBookById = (id, epIndex) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_schema_1.Books.findOne({ _id: id });
    if (!book) {
        return null;
    }
    // Prepare the result object
    const result = {
        title: book.title,
        prologue: book.prologue,
        image: book.image,
        episodes: [],
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
});
const getFormattedBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_schema_1.Books.findOne({ _id: id });
    if (!book) {
        return null;
    }
    // Prepare the result object
    const result = {
        title: book.title,
        prologue: book.prologue,
        image: book.image,
        episodes: [],
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
});
const getEpisodeCountById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield books_schema_1.Books.findOne({ _id: id });
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
});
const updateBook = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const { bookId, actIndex, chapterIndex, episodeIndex, updatePayload } = payload;
    const updateFields = {};
    console.log({ payload });
    // Check if the update is for a top-level field like title or prologue
    if (actIndex === undefined &&
        chapterIndex === undefined &&
        episodeIndex === undefined) {
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
                updateFields[`acts.${actIndex}.chapters.${chapterIndex}.episodes.${episodeIndex}`] = Object.assign({}, updatePayload);
            }
            else {
                updateFields[`acts.${actIndex}.chapters.${chapterIndex}`] = Object.assign({}, updatePayload);
            }
        }
        else {
            updateFields[`acts.${actIndex}`] = Object.assign({}, updatePayload);
        }
    }
    else {
        if (updatePayload.acts) {
            updateFields.acts = updatePayload.acts;
        }
    }
    // Perform the update in MongoDB
    const result = yield books_schema_1.Books.findOneAndUpdate({ _id: bookId }, { $set: updateFields }, { new: true });
    return result;
});
const addActToBook = (bookId, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const act = payload;
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    // Validate Act Structure
    if (!act.chapters || act.chapters.length === 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "An Act must have at least one Chapter.");
    }
    for (const chapter of act.chapters) {
        if (!chapter.episodes || chapter.episodes.length === 0) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Chapter "${chapter.title}" must have at least one Episode.`);
        }
        for (const episode of chapter.episodes) {
            episode.createdAt = new Date(); // Set the createdAt date for each episode
        }
    }
    // Push the new Act into the existing book
    const updatedBook = yield books_schema_1.Books.findOneAndUpdate({ _id: bookId }, { $push: { acts: act } }, { new: true });
    return updatedBook;
});
const addChapterToAct = (bookId, actTitle, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
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
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, `Chapter "${chapter.title}" must have at least one Episode.`);
    }
    for (const episode of chapter.episodes) {
        episode.createdAt = new Date(); // Set the createdAt date for each episode
    }
    // Add Chapter to the Correct Act
    const updatedBook = yield books_schema_1.Books.findOneAndUpdate({ _id: bookId, "acts.title": actTitle }, // Find the correct book & act
    { $push: { "acts.$.chapters": chapter } }, // Push chapter into the correct act
    { new: true });
    if (!updatedBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book or Act not found.");
    }
    return updatedBook;
});
const addEpisodeToChapter = (bookId, actTitle, chapterTitle, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    // Validate Episode Structure
    if (!payload.title || !payload.content) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Episode must have a title and content.");
    }
    // Find the book and get the index of the act and chapter
    const book = yield books_schema_1.Books.findOne({ _id: bookId });
    if (!book) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found.");
    }
    // Find the correct act
    const actIndex = book.acts.findIndex(act => act.title === actTitle);
    if (actIndex === -1) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Act not found.");
    }
    // Find the correct chapter within the act
    const chapterIndex = book.acts[actIndex].chapters.findIndex(chapter => chapter.title === chapterTitle);
    if (chapterIndex === -1) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Chapter not found.");
    }
    payload.createdAt = new Date();
    // Use the found indices to update the correct nested array
    const updateQuery = {
        [`acts.${actIndex}.chapters.${chapterIndex}.episodes`]: payload, // Dynamically update the path
    };
    const updatedBook = yield books_schema_1.Books.findOneAndUpdate({ _id: bookId }, { $push: updateQuery }, { new: true });
    if (!updatedBook) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Failed to update book, act, or chapter.");
    }
    return updatedBook;
});
const deleteBook = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield books_schema_1.Books.findOneAndDelete({ _id: id }, { new: true });
    return result;
});
const getBooksTitle = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_schema_1.Books.find().select("title");
    return result;
});
const getLatestEpisode = () => __awaiter(void 0, void 0, void 0, function* () {
    const latestBook = yield books_schema_1.Books.findOne().sort({ updatedAt: -1 });
    if (!latestBook) {
        return null;
    }
    let latest = null;
    for (const act of latestBook.acts) {
        for (const chapter of act.chapters) {
            for (const episode of chapter.episodes) {
                if (!latest ||
                    new Date(episode.createdAt).getTime() >
                        new Date(latest.createdAt).getTime()) {
                    latest = episode;
                }
            }
        }
    }
    return latest;
});
exports.BooksService = {
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
