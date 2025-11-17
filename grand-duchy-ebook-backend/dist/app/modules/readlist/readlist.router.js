"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadListRouter = void 0;
const express_1 = __importDefault(require("express"));
const readlist_controller_1 = require("./readlist.controller");
const router = express_1.default.Router();
router.post("/createReadList", readlist_controller_1.ReadListController.createReadList);
router.get("/getLatestReadList", readlist_controller_1.ReadListController.getLatestReadList);
router.get("/getReadListDetails", readlist_controller_1.ReadListController.getReadListDetails);
exports.ReadListRouter = router;
