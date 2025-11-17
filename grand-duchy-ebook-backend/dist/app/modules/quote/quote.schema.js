"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = void 0;
const mongoose_1 = require("mongoose");
const quoteSchema = new mongoose_1.Schema({
    quote: { type: String, required: true },
    author: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Quote = (0, mongoose_1.model)("Quote", quoteSchema);
