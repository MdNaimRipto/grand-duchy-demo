import express from "express";
import { SummaryController } from "./summary.controller";

const router = express.Router();

router.post("/addSummary", SummaryController.addSummary);

router.get("/getAllSummary", SummaryController.getAllSummary);

router.get(
  "/getSummariesByBook/:bookId/:actTitle/:chapterTitle/:episodeTitle",
  SummaryController.getSummariesByBook,
);

router.patch("/updateSummary/:summaryId", SummaryController.updateSummary);

router.delete("/deleteSummary/:summaryId", SummaryController.deleteSummary);

export const SummaryRouter = router;
