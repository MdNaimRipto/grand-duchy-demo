import express from "express";
import { CharacterController } from "./character.controller";

const router = express.Router();

router.post("/uploadCharacter", CharacterController.uploadCharacter);

router.get("/getAllCharacters", CharacterController.getAllCharacters);

router.get("/getRandomCharacter", CharacterController.getRandomCharacter);

router.patch("/updateCharacter/:id", CharacterController.updateCharacter);

router.delete("/deleteCharacter/:id", CharacterController.deleteCharacter);

export const CharacterRouter = router;
