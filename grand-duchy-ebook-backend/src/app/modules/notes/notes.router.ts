import express from "express";
import { NoteController } from "./notes.controller";

const router = express.Router();

router.post("/uploadNote", NoteController.uploadNote);

router.get("/getAllNotes", NoteController.getAllNotes);

router.get("/getLatestNote", NoteController.getLatestNote);

router.patch("/updateNote/:id", NoteController.updateNote);

router.delete("/deleteNote/:id", NoteController.deleteNote);

export const NoteRouter = router;
