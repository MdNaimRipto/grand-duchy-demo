"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryRouter = void 0;
const express_1 = __importDefault(require("express"));
const summary_controller_1 = require("./summary.controller");
const router = express_1.default.Router();
router.post("/addSummary", summary_controller_1.SummaryController.addSummary);
router.get("/getAllSummary", summary_controller_1.SummaryController.getAllSummary);
router.get("/getSummariesByBook/:bookId/:actTitle/:chapterTitle/:episodeTitle", summary_controller_1.SummaryController.getSummariesByBook);
router.patch("/updateSummary/:summaryId", summary_controller_1.SummaryController.updateSummary);
router.delete("/deleteSummary/:summaryId", summary_controller_1.SummaryController.deleteSummary);
exports.SummaryRouter = router;
