import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserSchema from "./user.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const limit = rateLimit({
  windowMs: 60 * 1000,
  limit: 30,
  message: "Too many requests."
})

const app = express();
app.set('trust proxy', 1);
app.use(limit);
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const playerModel = mongoose.model('Player', UserSchema)

app.get("/user/sever/v1/:id", async (req, res) => {
  const key = req.headers["x-api-key"]

  if (!key){
    return res.status(403).send("Missing API KEY");
  }

  if (key !== process.env.API_KEY){
    return res.status(403).send("Invalid API Key");
  }

  async function playerDataCheck(){
    const playerData = await playerModel.findOne({UserId: req.params.id})
    if (playerData) {
      return playerData;
    }
  }

  res.json(await playerDataCheck());
})

app.post("/user/sever/v1/:id", async (req, res) => {
  const key = req.headers["x-api-key"]

  if (!key){
    return res.status(403).send("Missing API KEY");
  }

  if (key !== process.env.API_KEY){
    return res.status(403).send("Invalid API Key");
  }

  console.log(req.params, req.body);

  try {
    const {id} = req.params;
    const {Username, VoiceActivity, UserProgress} = req.body;

    let result = await playerModel.findOneAndUpdate(
      {UserId: id},
      {$set: 
        {VoiceActivity: req.body.VoiceActivity,
          Username: req.body.Username,
          UserProgress: req.body.UserProgress
        }
      },
    ) 
    
    if (!result) {
      const newPlayer = new playerModel({
        UserId: id,
        Username,
        VoiceActivity,
        UserProgress
      })
  
      const newPlayerData = await newPlayer.save();
  
      return res.json(newPlayerData);
    }

    res.json({message: "Updated Database"});
  } catch (err){
    console.log("Error couldn't POST", err);
    res.status(500).send("Internal Server Error");
  }


})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
