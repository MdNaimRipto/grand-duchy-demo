"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const mongoose_1 = require("mongoose");
const characterSchema = new mongoose_1.Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    summery: { type: String, required: true },
}, {
    timestamps: true,
});
exports.Character = (0, mongoose_1.model)("Character", characterSchema);
