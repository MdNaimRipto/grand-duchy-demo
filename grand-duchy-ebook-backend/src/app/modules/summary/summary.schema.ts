import { model, Schema } from "mongoose";
import { ISummary } from "./summary.interface";

const summarySchema = new Schema<ISummary>(
  {
    bookId: { type: String, required: true },
    characterName: { type: String, required: true },
    actTitle: { type: String, required: true },
    chapterTitle: { type: String, required: true },
    episodeTitle: { type: String, required: true },
    summary: { type: String, required: true },
    image: { type: String, required: true, default: "empty" },
  },
  { timestamps: true },
);

export const Summary = model<ISummary>("Summary", summarySchema);
