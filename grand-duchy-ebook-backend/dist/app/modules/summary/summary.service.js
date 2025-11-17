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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const books_schema_1 = require("../books/books.schema");
const summary_schema_1 = require("./summary.schema");
const summery_constant_1 = require("./summery.constant");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
const users_schema_1 = require("../users/users.schema");
const addSummary = (summary, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const { actTitle, bookId, chapterTitle, episodeTitle } = summary;
    const isBookExists = yield books_schema_1.Books.findOne({ _id: bookId });
    if (!isBookExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Book not found!");
    }
    const isActExists = yield books_schema_1.Books.findOne({
        _id: bookId,
        acts: {
            $elemMatch: {
                title: actTitle,
            },
        },
    });
    if (!isActExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Act not found!");
    }
    const isChapterExists = yield books_schema_1.Books.findOne({
        _id: bookId,
        acts: {
            $elemMatch: {
                title: actTitle,
                chapters: { $elemMatch: { title: chapterTitle } },
            },
        },
    });
    if (!isChapterExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Chapter not found!");
    }
    const isEpisodeExists = yield books_schema_1.Books.findOne({
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
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Episode not found!");
    }
    const result = yield summary_schema_1.Summary.create(summary);
    return result;
});
const getAllSummary = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: summery_constant_1.SummerySearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelpers_1.calculatePaginationFunction)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    //
    const checkAndCondition = (andConditions === null || andConditions === void 0 ? void 0 : andConditions.length) > 0 ? { $and: andConditions } : {};
    const result = yield summary_schema_1.Summary.find(checkAndCondition)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield summary_schema_1.Summary.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// const getAllSummary = async () => {
//   const result = await Summary.find({});
//   return result;
// };
const getSummariesByBook = (_a) => __awaiter(void 0, [_a], void 0, function* ({ bookId, actTitle, chapterTitle, episodeTitle, }) {
    console.log({ bookId, actTitle, chapterTitle, episodeTitle });
    const findSummaries = yield summary_schema_1.Summary.find({
        bookId,
        actTitle,
        chapterTitle,
        episodeTitle,
    });
    return findSummaries;
});
const updateSummary = (summaryId, payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield summary_schema_1.Summary.findOneAndUpdate({ _id: summaryId }, payload, {
        new: true,
    });
    return result;
});
const deleteSummary = (summaryId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield summary_schema_1.Summary.findByIdAndDelete(summaryId);
    return result;
});
exports.SummaryService = {
    addSummary,
    getAllSummary,
    getSummariesByBook,
    updateSummary,
    deleteSummary,
};
