"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimerRouter = void 0;
const express_1 = __importDefault(require("express"));
const timer_controller_1 = require("./timer.controller");
const router = express_1.default.Router();
router.patch("/updateOrCreateTimer/:id", timer_controller_1.TimerController.updateOrCreateTimer);
router.get("/getUpcomingTime", timer_controller_1.TimerController.getUpcomingTime);
exports.TimerRouter = router;
