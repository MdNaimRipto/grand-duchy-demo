import { model, Schema } from "mongoose";
import { ITimer } from "./timer.interface";

const timerSchema = new Schema<ITimer>(
  {
    time: { type: Date, required: true },
  },
  {
    timestamps: true,
  },
);

export const Timer = model<ITimer>("Timer", timerSchema);
