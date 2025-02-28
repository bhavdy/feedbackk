"use client";

import React, { ReactNode, useState } from "react";
import { Home, MessageSquare, Menu, X, LogOut } from "lucide-react";

type Props = {
  children: ReactNode;
};

// Feedback Data (With Unique IDs)
const feedbackData = [
  { id: "F001", feedback: "Very helpful support!", rating: 5 },
  { id: "F002", feedback: "Slow response time.", rating: 2 },
  { id: "F003", feedback: "Loved the interaction!", rating: 4 },
  { id: "F004", feedback: "Not satisfied with the service.", rating: 1 },
  { id: "F005", feedback: "Awesome team!", rating: 5 },
  { id: "F006", feedback: "Terrible experience.", rating: 1 },
];

const Sidebar = ({ setActivePage, isOpen, setSidebarOpen }: { setActivePage: (page: string) => void; isOpen: boolean; setSidebarOpen: (open: boolean) => void }) => {
  return (
    <div className={`bg-gray-900 text-white min-h-screen p-6 space-y-10 fixed md:static transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-72 md:w-80 z-50`}>
      {/* Centered title on mobile */}
      <div className="flex justify-center md:justify-start items-center mb-6">
        <h2 className="text-3xl font-bold md:ml-4">Admin Panel</h2>
        <button className="md:hidden text-white absolute right-6" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="space-y-6">
        <button className="flex items-center gap-4 text-xl font-medium py-3 px-4 w-full hover:bg-gray-800 rounded-lg" onClick={() => setActivePage("dashboard")}><Home size={28} /> Dashboard </button>
        <button className="flex items-center gap-4 text-xl font-medium py-3 px-4 w-full hover:bg-gray-800 rounded-lg" onClick={() => setActivePage("feedback")}><MessageSquare size={28} /> Feedback </button>
        <button className="flex items-center gap-4 text-xl font-medium py-3 px-4 w-full hover:bg-red-600 rounded-lg mt-6" onClick={() => alert("Logging out...")}><LogOut size={28} /> Logout </button>
      </nav>
    </div>
  );
};

const Feedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<"good" | "bad" | null>(null);

  const goodFeedback = feedbackData.filter((fb) => fb.rating >= 4);
  const badFeedback = feedbackData.filter((fb) => fb.rating <= 3);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-black mb-4">Feedback</h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded text-white ${selectedFeedback === "good" ? "bg-green-600" : "bg-gray-600"}`}
          onClick={() => setSelectedFeedback(selectedFeedback === "good" ? null : "good")}
        >
          Good Feedback
        </button>
        <button
          className={`px-4 py-2 rounded text-white ${selectedFeedback === "bad" ? "bg-red-600" : "bg-gray-600"}`}
          onClick={() => setSelectedFeedback(selectedFeedback === "bad" ? null : "bad")}
        >
          Bad Feedback
        </button>
      </div>

      {selectedFeedback && (
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900 text-white text-left">
                <th className="p-3">ID</th>
                <th className="p-3">Feedback</th>
              </tr>
            </thead>
            <tbody>
              {(selectedFeedback === "good" ? goodFeedback : badFeedback).map((fb, index) => (
                <tr key={fb.id} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-white text-black"}>
                  <td className="p-3">{fb.id}</td>
                  <td className="p-3">{fb.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  const totalFeedback = feedbackData.length;
  const goodFeedbackCount = feedbackData.filter((fb) => fb.rating >= 4).length;
  const badFeedbackCount = feedbackData.filter((fb) => fb.rating <= 3).length;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-black mb-4">Dashboard</h2>
      <div className="space-y-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-medium">Total Feedback</h3>
          <p className="text-2xl">{totalFeedback}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-medium">Good Feedback</h3>
          <p className="text-2xl">{goodFeedbackCount}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-medium">Bad Feedback</h3>
          <p className="text-2xl">{badFeedbackCount}</p>
        </div>
      </div>
    </div>
  );
};

const AdminPanel: React.FC = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Moved toggle button slightly to prevent overlap */}
      <button
        className="absolute top-4 left-4 md:hidden bg-gray-900 text-white p-2 rounded z-50"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <Sidebar setActivePage={setActivePage} isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 p-6 md:ml-72">
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default AdminPanel;