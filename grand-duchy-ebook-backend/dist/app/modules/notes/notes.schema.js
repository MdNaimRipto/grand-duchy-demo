"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notes = void 0;
const mongoose_1 = require("mongoose");
const notesSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    note: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Notes = (0, mongoose_1.model)("Notes", notesSchema);
