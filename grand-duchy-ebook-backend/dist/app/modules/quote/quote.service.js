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
exports.QuoteService = void 0;
const config_1 = __importDefault(require("../../../config/config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const quote_schema_1 = require("./quote.schema");
const users_schema_1 = require("../users/users.schema");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const uploadQuote = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield quote_schema_1.Quote.create(payload);
    return result;
});
const getAllQuotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield quote_schema_1.Quote.find({});
    return result;
});
const getRandomQuote = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield quote_schema_1.Quote.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const result = yield quote_schema_1.Quote.findOne().skip(randomIndex);
    return result;
});
const updateQuote = (payload, quoteId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield quote_schema_1.Quote.findOneAndUpdate({ _id: quoteId }, payload, {
        new: true,
    });
    return result;
});
const deleteQuote = (quoteId, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield quote_schema_1.Quote.findOneAndDelete({ _id: quoteId }, {
        new: true,
    });
    return result;
});
exports.QuoteService = {
    uploadQuote,
    getAllQuotes,
    getRandomQuote,
    updateQuote,
    deleteQuote,
};
