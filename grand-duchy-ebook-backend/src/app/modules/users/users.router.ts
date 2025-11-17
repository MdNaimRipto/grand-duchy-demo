import express from "express";
import { UserController } from "./users.controller";

const router = express.Router();

router.post("/providerLogin", UserController.providerLogin);

router.patch("/updateFont", UserController.updateFont);

router.get("/getAllUsers", UserController.getAllUsers);

router.patch("/updateTotalActiveTime", UserController.updateTotalActiveTime);

router.get("/getTotalActiveTime", UserController.getTotalActiveTime);

export const UserRouter = router;
