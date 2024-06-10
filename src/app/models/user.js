import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  { title: String },
  { description: String },
  { status: String },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
