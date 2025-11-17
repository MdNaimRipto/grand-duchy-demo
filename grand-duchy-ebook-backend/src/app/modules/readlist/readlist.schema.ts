import { model, Schema } from "mongoose";
import { IReadList } from "./readlist.interface";

const readListSchema = new Schema<IReadList>(
  {
    bookId: { type: String, required: true },
    lastEpisodeTitle: { type: String, required: true },
    email: { type: String, required: true },
    currentIndex: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: true,
  },
);

export const ReadList = model<IReadList>("ReadList", readListSchema);
