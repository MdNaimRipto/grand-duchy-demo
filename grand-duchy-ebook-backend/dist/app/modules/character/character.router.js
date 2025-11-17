"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterRouter = void 0;
const express_1 = __importDefault(require("express"));
const character_controller_1 = require("./character.controller");
const router = express_1.default.Router();
router.post("/uploadCharacter", character_controller_1.CharacterController.uploadCharacter);
router.get("/getAllCharacters", character_controller_1.CharacterController.getAllCharacters);
router.get("/getRandomCharacter", character_controller_1.CharacterController.getRandomCharacter);
router.patch("/updateCharacter/:id", character_controller_1.CharacterController.updateCharacter);
router.delete("/deleteCharacter/:id", character_controller_1.CharacterController.deleteCharacter);
exports.CharacterRouter = router;
