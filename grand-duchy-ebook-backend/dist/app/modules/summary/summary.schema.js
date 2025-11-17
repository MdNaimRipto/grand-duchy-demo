"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const mongoose_1 = require("mongoose");
const summarySchema = new mongoose_1.Schema({
    bookId: { type: String, required: true },
    characterName: { type: String, required: true },
    actTitle: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    episodeTitle: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true, default: "empty" },
}, { timestamps: true });
exports.Summary = (0, mongoose_1.model)("Summary", summarySchema);
