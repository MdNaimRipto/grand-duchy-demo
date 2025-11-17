import { model, Schema } from "mongoose";
import { INote } from "./notes.interface";

const notesSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    note: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Notes = model<INote>("Notes", notesSchema);
