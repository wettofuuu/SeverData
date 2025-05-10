import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserId: String,
    Username: String,
    VoiceActivity: {
      "QuietL": {type: Number, default: null},
      "QuietM": {type: Number, default: null},
      "QuietH": {type: Number, default: null},
      "WhisperL": {type: Number, default: null},
      "WhisperM": {type: Number, default: null},
      "WhisperH": {type: Number, default: null},
      "TalkingL": {type: Number, default: null},
      "TalkingM": {type: Number, default: null},
      "TalkingH": {type: Number, default: null},
      "QuietP": {type: Number, default: null},
      "WhisperP": {type: Number, default: null},
      "TalkingP": {type: Number, default: null}
    },
    BadgeData: {
      "1": {type: Number},
      "2": {type: Number},
      "3": {type: Number},

    },
    UserProgress: Number,
  }
);

export default UserSchema;
