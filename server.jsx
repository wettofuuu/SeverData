const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.get("/userdata", (req, res) => {
  res.json({ message: "Backend is working with MongoDB!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});