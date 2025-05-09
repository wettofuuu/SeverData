import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserId: String,
    Username: String,
    VoiceActivity: {
      "QuietLowGain": {type: Number, default: null},
      "QuietMidGain": {type: Number, default: null},
      "QuietHighGain": {type: Number, default: null},
      "WhisperLowGain": {type: Number, default: null},
      "WhisperMidGain": {type: Number, default: null},
      "WhisperHighGain": {type: Number, default: null},
      "TalkingLowGain": {type: Number, default: null},
      "TalkingMidGain": {type: Number, default: null},
      "TalkingHighGain": {type: Number, default: null},
      "QuietPercentage": {type: Number, default: null},
      "WhisperPercentage": {type: Number, default: null},
      "TalkingPercentage": {type: Number, default: null}
    },
    UserProgress: Number,
  }
);

export default UserSchema;
