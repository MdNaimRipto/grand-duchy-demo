"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const mongoose_1 = require("mongoose");
const timerSchema = new mongoose_1.Schema({
    time: { type: Date, required: true },
}, {
    timestamps: true,
});
exports.Timer = (0, mongoose_1.model)("Timer", timerSchema);
