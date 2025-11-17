import { model, Schema } from "mongoose";
import { IBooks } from "./books.interface";

const booksSchema = new Schema<IBooks>(
  {
    title: { type: String, required: true },
    prologue: { type: String, required: true },
    image: { type: String, required: true, default: "empty" },
    acts: [
      {
        title: { type: String, required: true },
        chapters: [
          {
            title: { type: String, required: true },
            episodes: [
              {
                title: { type: String, required: true },
                content: { type: String, required: true },
                createdAt: { type: Date, required: true },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Books = model<IBooks>("Books", booksSchema);
