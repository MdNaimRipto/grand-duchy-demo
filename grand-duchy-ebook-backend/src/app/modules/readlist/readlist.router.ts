import express from "express";
import { ReadListController } from "./readlist.controller";

const router = express.Router();

router.post("/createReadList", ReadListController.createReadList);

router.get("/getLatestReadList", ReadListController.getLatestReadList);

router.get("/getReadListDetails", ReadListController.getReadListDetails);

export const ReadListRouter = router;
