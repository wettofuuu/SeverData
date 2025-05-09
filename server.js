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

app.get("/userdata", (req, res) => {
  res.json({});
});

app.get("/user/:id", async (req, res) => {
  async function playerDataCheck(){
    const playerData = await UserSchema.findOne({userId: `${req.params.userId}`})

    if (playerData) {
      return playerData;
    } else {
      const newPlayer = new UserSchema({
        userId: `${req.params.id}`,
        audio: null,
        userProgress: null
      })

      const newPlayerData = await newPlayer.save();

      return newPlayerData;
    }
  }

  res.json(await playerDataCheck);
})

app.post("/")
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
