"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import Alerts from "./components/Alerts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "data">("home");

  return (
    <div className="bg-yellow-200 text-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setActiveTab("home")}
            className={`mr-2 px-6 py-2 rounded-xl transition-colors ${
              activeTab === "home"
                ? "bg-black text-yellow-200"
                : "bg-yellow-300 hover:bg-yellow-400"
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-6 py-2 rounded-xl transition-colors ${
              activeTab === "data"
                ? "bg-black text-yellow-200"
                : "bg-yellow-300 hover:bg-yellow-400"
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
