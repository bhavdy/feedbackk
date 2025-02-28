require("dotenv").config(); // Load environment variables

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/feedback"; // Default fallback

// ✅ Debugging: Check if MONGO_URI is loaded correctly
console.log("🟢 Loaded MONGO_URI:", MONGO_URI);

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Stop server if DB connection fails
  });

// ✅ Define Schema & Model
const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// ✅ API Routes

// POST: Save Feedback
app.post("/api/feedback", async (req, res) => {
  try {
    const { rating, description } = req.body;

    // Validate data
    if (!rating || !description) {
      return res.status(400).json({ error: "Rating and description are required" });
    }

    const newFeedback = new Feedback({ rating, description });
    await newFeedback.save();

    res.status(201).json({ message: "✅ Feedback saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving feedback:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Fetch All Feedbacks
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Fetch latest first
    res.json(feedbacks);
  } catch (error) {
    console.error("❌ Error fetching feedback:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
