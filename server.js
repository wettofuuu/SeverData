import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./user.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const playerModel = mongoose.model('Player', UserSchema)

app.get("/user/:id", async (req, res) => {
  async function playerDataCheck(){
    const playerData = await playerModel.findOne({UserId: req.params.id})
    if (playerData) {
      return playerData;
    } else {
      const newPlayer = new playerModel({
        UserId: req.params.id,
        Username: null,
        VoiceActivity: null,
        UserProgress: null
      })

      const newPlayerData = await newPlayer.save();

      return newPlayerData;
    }
  }

  res.json(await playerDataCheck());
})

app.post("/user/:id", async (req, res) => {
  await playerModel.findOneAndUpdate(
    {UserId: `${req.params.id}`},

    {$set: 
      {VoiceActivity: req.body.VoiceActivity,
        Username: req.body.Username,
        UserProgress: req.body.UserProgress
      }
    },
  ) 
  res.send("Updated Database");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
