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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadListService = void 0;
const readlist_schema_1 = require("./readlist.schema");
const createReadList = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId, email } = payload;
    const isExists = yield readlist_schema_1.ReadList.findOne({ bookId, email });
    if (isExists) {
        const result = yield readlist_schema_1.ReadList.findOneAndUpdate({ bookId, email }, payload, {
            new: true,
        });
        return result;
    }
    const result = yield readlist_schema_1.ReadList.create(payload);
    return result;
});
const getLatestReadList = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readlist_schema_1.ReadList.findOne({ email }).sort({ updatedAt: -1 });
    return result;
});
const getReadListDetails = (email, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield readlist_schema_1.ReadList.findOne({ email, bookId });
    return result;
});
exports.ReadListService = {
    createReadList,
    getLatestReadList,
    getReadListDetails,
};
