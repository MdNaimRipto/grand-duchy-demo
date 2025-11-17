"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Books = void 0;
const mongoose_1 = require("mongoose");
const booksSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    prologue: { type: String, required: true },
    image: { type: String, required: true, default: "empty" },
    acts: [
        {
            title: { type: String, required: true },
            chapters: [
                {
                    title: { type: String, required: true },
                    episodes: [
                        {
                            title: { type: String, required: true },
                            content: { type: String, required: true },
                            createdAt: { type: Date, required: true },
                        },
                    ],
                },
            ],
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Books = (0, mongoose_1.model)("Books", booksSchema);
