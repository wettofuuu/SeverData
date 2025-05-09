import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    UserId: String,
    VoiceActivity: {
      "QuietLowGain": null,
      "QuietMidGain": null,
      "QuietHighGain": null,
      "WhisperLowGain": null,
      "WhisperMidGain": null,
      "WhisperHighGain": null,
      "TalkingLowGain": null,
      "TalkingMidGain": null,
      "TalkingHighGain": null,
      "QuietPercentage": null,
      "WhisperPercentage": null,
      "TalkingPercentage": null
    },
    UserProgress: Number,
  }
);

export default UserSchema;
