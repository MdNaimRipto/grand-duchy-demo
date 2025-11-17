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
exports.BooksController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const books_service_1 = require("./books.service");
const verifyAuthToken_1 = require("../../../util/verifyAuthToken");
// Upload Book
const uploadBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const payload = __rest(req.body, []);
    const result = yield books_service_1.BooksService.uploadBook(payload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book Uploaded Successfully",
        data: result,
    });
}));
// Get All Books
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_service_1.BooksService.getAllBooks();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Books",
        data: result,
    });
}));
// Get Book By Id
const getBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { epIndex } = req.query;
    const result = yield books_service_1.BooksService.getBookById(id, Number(epIndex));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book By Id",
        data: result,
    });
}));
// Get Episode Count By Id
const getEpisodeCountById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.BooksService.getEpisodeCountById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book By Id",
        data: result,
    });
}));
// Update Book
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const payload = __rest(req.body, []);
    const result = yield books_service_1.BooksService.updateBook(payload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book Updated Successfully",
        data: result,
    });
}));
// Update Book
const addActToBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const { id } = req.params;
    const payload = __rest(req.body, []);
    const result = yield books_service_1.BooksService.addActToBook(id, payload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Act Added Successfully",
        data: result,
    });
}));
// Add Chapter to book
const addChapterToAct = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const { id } = req.params;
    const { actTitle } = req.query;
    const payload = __rest(req.body, []);
    console.log(payload);
    const result = yield books_service_1.BooksService.addChapterToAct(id, actTitle, payload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Chapter Added Successfully",
        data: result,
    });
}));
// Add Episode to book
const addEpisodeToChapter = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { actTitle, chapterTitle } = req.query;
    const payload = __rest(req.body, []);
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const result = yield books_service_1.BooksService.addEpisodeToChapter(id, actTitle, chapterTitle, payload, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Episode Added Successfully",
        data: result,
    });
}));
// Delete Book
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const result = yield books_service_1.BooksService.deleteBook(id, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Book Deleted Successfully",
        data: result,
    });
}));
// Get All Books
const getBooksTitle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_service_1.BooksService.getBooksTitle();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All Books Title",
        data: result,
    });
}));
// Get All Books
const getLatestEpisode = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield books_service_1.BooksService.getLatestEpisode();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Latest Episode",
        data: result,
    });
}));
const getFormattedBookById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield books_service_1.BooksService.getFormattedBookById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Formatted Book By Id",
        data: result,
    });
}));
exports.BooksController = {
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
