"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteRouter = void 0;
const express_1 = __importDefault(require("express"));
const notes_controller_1 = require("./notes.controller");
const router = express_1.default.Router();
router.post("/uploadNote", notes_controller_1.NoteController.uploadNote);
router.get("/getAllNotes", notes_controller_1.NoteController.getAllNotes);
router.get("/getLatestNote", notes_controller_1.NoteController.getLatestNote);
router.patch("/updateNote/:id", notes_controller_1.NoteController.updateNote);
router.delete("/deleteNote/:id", notes_controller_1.NoteController.deleteNote);
exports.NoteRouter = router;
