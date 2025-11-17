"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteRouter = void 0;
const express_1 = __importDefault(require("express"));
const quote_controller_1 = require("./quote.controller");
const router = express_1.default.Router();
router.post("/uploadQuote", quote_controller_1.QuoteController.uploadQuote);
router.get("/getAllQuotes", quote_controller_1.QuoteController.getAllQuotes);
router.get("/getRandomQuote", quote_controller_1.QuoteController.getRandomQuote);
router.patch("/updateQuote/:id", quote_controller_1.QuoteController.updateQuote);
router.delete("/deleteQuote/:id", quote_controller_1.QuoteController.deleteQuote);
exports.QuoteRouter = router;
