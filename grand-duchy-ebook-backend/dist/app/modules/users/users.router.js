"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.post("/providerLogin", users_controller_1.UserController.providerLogin);
router.patch("/updateFont", users_controller_1.UserController.updateFont);
router.get("/getAllUsers", users_controller_1.UserController.getAllUsers);
router.patch("/updateTotalActiveTime", users_controller_1.UserController.updateTotalActiveTime);
router.get("/getTotalActiveTime", users_controller_1.UserController.getTotalActiveTime);
exports.UserRouter = router;
