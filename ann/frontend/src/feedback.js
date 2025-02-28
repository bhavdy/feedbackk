import { useState } from "react";
import "./FeedbackForm.css"; // Import the external CSS file

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState("");
  const [message, setMessage] = useState("");

  const handleStarClick = (value) => {
    setRating(value);
  };

  const clearFeedback = () => {
    setFeedbackText("");
    setRating(5);
    setMessage("");
  };

  const postFeedback = async () => {
    if (!feedbackText.trim()) return;

    const feedbackData = { rating, description: feedbackText };

    try {
      const response = await fetch("http://localhost:5000/api/feedback", {  // ✅ Fixed endpoint
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
      setMessage("❌ Error connecting to the server.");
    }
  };

  return (
    <div className="feedback-container">
      {/* Profile Section */}
      <div className="profile">
        <img src="photo.jpg" alt="Profile" />
        <p>Om Gaikwad</p>
      </div>

      {/* Star Rating */}
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? "active" : "inactive"}
            onClick={() => handleStarClick(star)}
          >
            ★
          </span>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        placeholder="Share details of your experience at this place..."
        value={feedbackText}
        onChange={(e) => setFeedbackText(e.target.value)}
      ></textarea>

      {/* Buttons */}
      <div className="button-group">
        <button className="cancel-btn" onClick={clearFeedback}>Cancel</button>
        <button
          className={`post-btn ${!feedbackText.trim() ? "disabled" : ""}`}
          onClick={postFeedback}
          disabled={!feedbackText.trim()}
        >
          Post
        </button>
      </div>

      {/* Display Message */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}
