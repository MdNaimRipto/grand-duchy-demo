import express from "express";
import { QuoteController } from "./quote.controller";

const router = express.Router();

router.post("/uploadQuote", QuoteController.uploadQuote);

router.get("/getAllQuotes", QuoteController.getAllQuotes);

router.get("/getRandomQuote", QuoteController.getRandomQuote);

router.patch("/updateQuote/:id", QuoteController.updateQuote);

router.delete("/deleteQuote/:id", QuoteController.deleteQuote);

export const QuoteRouter = router;
