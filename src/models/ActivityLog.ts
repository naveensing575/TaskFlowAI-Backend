import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  admin: mongoose.Types.ObjectId;
  action: string;
  targetUser: mongoose.Types.ObjectId;
  timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  targetUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IActivityLog>("ActivityLog", activityLogSchema);
