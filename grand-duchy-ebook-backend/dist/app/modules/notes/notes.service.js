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
exports.NoteService = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const users_schema_1 = require("../users/users.schema");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const notes_schema_1 = require("./notes.schema");
const uploadNote = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield notes_schema_1.Notes.create(payload);
    return result;
});
const getAllNotes = (token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield notes_schema_1.Notes.find({});
    return result;
});
const getLatestNote = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notes_schema_1.Notes.findOne().sort({ createdAt: -1 });
    return result;
});
const updateNote = (payload, NoteId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield notes_schema_1.Notes.findOneAndUpdate({ _id: NoteId }, payload, {
        new: true,
    });
    return result;
});
const deleteNote = (NoteId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield notes_schema_1.Notes.findOneAndDelete({ _id: NoteId }, {
        new: true,
    });
    return result;
});
exports.NoteService = {
    uploadNote,
    getAllNotes,
    getLatestNote,
    updateNote,
    deleteNote,
};
