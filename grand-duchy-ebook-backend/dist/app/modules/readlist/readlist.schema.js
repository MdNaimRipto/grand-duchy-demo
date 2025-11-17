"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadList = void 0;
const mongoose_1 = require("mongoose");
const readListSchema = new mongoose_1.Schema({
    bookId: { type: String, required: true },
    lastEpisodeTitle: { type: String, required: true },
    email: { type: String, required: true },
    currentIndex: { type: Number, required: true, min: 0 },
}, {
    timestamps: true,
});
exports.ReadList = (0, mongoose_1.model)("ReadList", readListSchema);
