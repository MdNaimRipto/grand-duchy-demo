import express from "express";
import { TimerController } from "./timer.controller";

const router = express.Router();

router.patch("/updateOrCreateTimer/:id", TimerController.updateOrCreateTimer);

router.get("/getUpcomingTime", TimerController.getUpcomingTime);

export const TimerRouter = router;
