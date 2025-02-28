require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/feedback";

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// ✅ Corrected MongoDB connection (No deprecated options)
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Feedback Schema
const feedbackSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// POST Feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { rating, description } = req.body;

    if (!description.trim()) {
      return res.status(400).json({ error: "Feedback cannot be empty!" });
    }

    const newFeedback = new Feedback({ rating, description });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving feedback:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// GET Feedback
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (error) {
    console.error("❌ Error fetching feedback:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
