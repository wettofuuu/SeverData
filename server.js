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
  console.log("weewoo");
  console.log(`${req.params.id}`);
  async function playerDataCheck(){
    const playerData = await playerModel.findOne({userId: req.params.id})
    if (playerData) {
      console.log("FOund one")
      return playerData;
    } else {
      console.log("Creating account")
      const newPlayer = new playerModel({
        userId: req.params.id,
        audio: null,
        userProgress: null
      })

      const newPlayerData = await newPlayer.save();

      return newPlayerData;
    }
  }

  res.json(await playerDataCheck());
})

app.post("/user/:id", async (req, res) => {
  await playerModel.findOneAndUpdate(
    {userId: `${request.params.id}`},
    {$set: {audio: request.body.audio}}
  ) 
  res.send("Updated Database");
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
