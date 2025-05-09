import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: String,
    audio: Number,
    userProgress: Number,
  }
);

export default UserSchema;
