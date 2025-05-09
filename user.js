import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userID: Number,
    audio: Number,
    userProgress: Number,
  }
);

export default UserSchema;
