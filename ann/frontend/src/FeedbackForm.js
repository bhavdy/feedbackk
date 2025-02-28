import { useState } from "react";
import "./FeedbackForm.css"; // Import external CSS

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Prevent multiple submissions

  // Handle star rating selection
  const handleStarClick = (value) => {
    if (value !== rating) setRating(value);
  };

  // Clear feedback form
  const clearFeedback = () => {
    setFeedbackText("");
    setRating(5);
    setMessage("");
  };

  // Send feedback data to the backend
  const postFeedback = async () => {
    if (!feedbackText.trim()) {
      setMessage("❌ Feedback cannot be empty.");
      return;
    }

    const feedbackData = { rating, description: feedbackText };
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feedbackData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Feedback posted successfully!");
        clearFeedback();
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to post feedback"}`);
      }
    } catch (error) {
      console.error("❌ Error connecting to the server:", error);
      setMessage("❌ Error connecting to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-container">
      {/* Profile Section */}
      <div className="profile">
        <img src="photo.jpg" alt="Profile" onError={(e) => e.target.src = "default-profile.png"} />
        <p>Om Gaikwad</p>
      </div>

      {/* Star Rating */}
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "active" : "inactive"}
            onClick={() => handleStarClick(star)}
            aria-label={`Rate ${star} stars`}
            role="button"
          >
            ★
          </span>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        placeholder="Share details of your experience..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
        maxLength={500} // Prevent very long feedback
      ></textarea>

      {/* Buttons */}
      <div className="button-group">
        <button className="cancel-btn" onClick={clearFeedback}>Cancel</button>
        <button
          className={`post-btn ${!feedbackText.trim() || loading ? "disabled" : ""}`}
          onClick={postFeedback}
          disabled={!feedbackText.trim() || loading}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
