import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import FeedbackForm from "./FeedbackForm";
import "./App.css";

function App() {
  const feedbackURL =  192.168.209.216:3000/feedbackform; // Auto-detects base URL

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home Page with QR Code */}
          <Route
            path="/"
            element={
              <div className="App-header">
                <h1>QR Code for Feedback Form</h1>
                <QRCodeCanvas value={feedbackURL} size={200} />
                <p>Scan this QR code to visit: <br /><strong>{feedbackURL}</strong></p>
              </div>
            }
          />

          {/* Feedback Page */}
          <Route path="/feedbackform" element={<FeedbackForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
