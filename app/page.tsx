"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "data">("home");

  return (
    <div className="bg-gray-200 text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative rounded-full mb-8">
          <button
            onClick={() => setActiveTab("home")}
            className={`mr-2 px-6 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "home"
                ? "bg-black text-gray-200"
                : "bg-gray-300 hover:bg-black/70 hover:text-gray-200"
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-6 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "data"
                ? "bg-black text-gray-200"
                : "bg-gray-300 hover:bg-black/70 hover:text-gray-200"
            }`}
          >
            Dashboard
          </button>
        </div>

        {activeTab === "home" ? <Alerts /> : <Dashboard />}
      </div>
    </div>
  );
}
