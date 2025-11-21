import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILink extends Document {
  code: string;
  targetUrl: string;
  clicks: number;
  lastClicked?: Date | null;
  createdAt: Date;
  userId: Types.ObjectId;
}

const LinkSchema = new Schema<ILink>({
  code: { type: String, required: true, unique: true },
  targetUrl: { type: String, required: true },
  clicks: { type: Number, default: 0 },
  lastClicked: { type: Date, default: null },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Link = mongoose.model<ILink>("Link", LinkSchema);
