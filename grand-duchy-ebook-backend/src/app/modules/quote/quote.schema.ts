import { model, Schema } from "mongoose";
import { IQuote } from "./quote.interface";

const quoteSchema = new Schema<IQuote>(
  {
    quote: { type: String, required: true },
    author: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Quote = model<IQuote>("Quote", quoteSchema);
