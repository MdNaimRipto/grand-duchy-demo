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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const users_service_1 = require("./users.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const verifyAuthToken_1 = require("../../../util/verifyAuthToken");
// Check User Exists
const providerLogin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userInfo, authMethod } = req.body;
    const result = yield users_service_1.UserService.providerLogin(userInfo, authMethod);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Login Successful",
        data: result,
    });
}));
// Update Font
const updateFont = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, fontSize } = req.body;
    const result = yield users_service_1.UserService.updateFont(email, fontSize);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Font Size Updated Successfully.",
        data: result,
    });
}));
// Get All
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const result = yield users_service_1.UserService.getAllUsers(token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Users Retrieved Successfully.",
        data: result,
    });
}));
// Update Total active
const updateTotalActiveTime = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, verifyAuthToken_1.verifyAuthToken)(req);
    const { email } = req.query;
    const result = yield users_service_1.UserService.updateTotalActiveTime(email, token);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Total Active Updated Successfully.",
        data: result,
    });
}));
// Get Total time
const getTotalActiveTime = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const result = yield users_service_1.UserService.getTotalActiveTime(email);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Total Active Time Retrieved Successfully.",
        data: result,
    });
}));
exports.UserController = {
    providerLogin,
    updateFont,
    getAllUsers,
    updateTotalActiveTime,
    getTotalActiveTime,
};
