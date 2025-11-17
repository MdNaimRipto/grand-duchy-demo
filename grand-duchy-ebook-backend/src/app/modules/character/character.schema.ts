import { model, Schema } from "mongoose";
import { ICharacter } from "./character.interface";

const characterSchema = new Schema<ICharacter>(
  {
    image: { type: String, required: true },
    name: { type: String, required: true },
    summery: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Character = model<ICharacter>("Character", characterSchema);
