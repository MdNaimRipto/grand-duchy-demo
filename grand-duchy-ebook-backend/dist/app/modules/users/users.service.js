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
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const users_schema_1 = require("./users.schema");
const users_utils_1 = require("./users.utils");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config/config"));
//* Provider Login
const providerLogin = (payload, authMethod) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    // Check if user exists
    const isExistsUser = yield users_schema_1.Users.findOne({ email });
    // If user exists
    if (isExistsUser) {
        const linkedProviders = isExistsUser.linkedProviders;
        // If the provider is not linked, link it
        if (!linkedProviders.includes(authMethod)) {
            linkedProviders.push(authMethod);
            const updatedUser = yield users_schema_1.Users.findOneAndUpdate({ email }, { $set: { linkedProviders } }, {
                new: true,
            });
            return (0, users_utils_1.generateAuthToken)(updatedUser);
        }
        // If the provider is already linked, return the auth token
        return (0, users_utils_1.generateAuthToken)(isExistsUser);
    }
    // If user doesn't exist, create a new one
    const uid = (0, users_utils_1.generateUID)();
    const isUIDExists = yield users_schema_1.Users.findOne({ uid: uid });
    if (isUIDExists) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Something went wrong! Please try again");
    }
    // Set the UID and linked providers
    payload.uid = uid;
    payload.linkedProviders = [authMethod];
    const user = yield users_schema_1.Users.create(payload);
    return (0, users_utils_1.generateAuthToken)(user);
});
// * Update Font
const updateFont = (email, fontSize) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_schema_1.Users.findOneAndUpdate({ email }, { fontSize }, { new: true });
    return (0, users_utils_1.generateAuthToken)(user);
});
const getAllUsers = (token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const result = yield users_schema_1.Users.find({}).select("userName email totalActive");
    return result;
});
// * Update Time
const updateTotalActiveTime = (email, token) => __awaiter(void 0, void 0, void 0, function* () {
    jwtHelpers_1.jwtHelpers.jwtVerify(token, config_1.default.jwt_secret);
    const userId = jwtHelpers_1.jwtHelpers.extractJwt(token, config_1.default.jwt_secret);
    const user = yield users_schema_1.Users.findOne({ _id: userId });
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to take this action");
    }
    if (user.userType !== "ADMIN") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "User must have to be admin to see the user details");
    }
    const isExistsUser = yield users_schema_1.Users.findOne({ email });
    if (!isExistsUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exists!");
    }
    const updateTime = 5 * 60 * 1000;
    const totalActiveTime = isExistsUser.totalActive + updateTime;
    yield users_schema_1.Users.findOneAndUpdate({ email }, { totalActive: totalActiveTime }, { new: true });
    return null;
});
const getTotalActiveTime = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield users_schema_1.Users.find({});
    const allUsersTotalActiveTime = users.reduce((acc, user) => acc + user.totalActive, 0);
    const loggedInUserActiveTime = yield users_schema_1.Users.findOne({ email }).select("totalActive");
    return {
        allUsersTotalActiveTime,
        loggedInUserActiveTime,
    };
});
exports.UserService = {
    providerLogin,
    updateFont,
    getAllUsers,
    updateTotalActiveTime,
    getTotalActiveTime,
};
