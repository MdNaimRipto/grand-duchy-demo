import { model, Schema } from "mongoose";
import { IUser } from "./users.interface";
import { LinkedProvidersEnums } from "./user.constant";

export const usersSchema = new Schema<IUser>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    uid: { type: String, required: true },
    userType: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
    linkedProviders: {
      type: [
        {
          type: String,
          enum: LinkedProvidersEnums,
        },
      ],
      required: true,
    },
    fontSize: { type: Number, required: true, default: 16, min: 0 },
    totalActive: { type: Number, required: true, default: 1000, min: 0 },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Users = model<IUser>("Users", usersSchema);
