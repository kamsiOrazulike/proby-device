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
            className={`mr-1 px-4 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "home"
                ? "text-black"
                : "text-black/30 hover:text-black"
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-4 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "data"
                ? "text-black"
                : "text-black/30 hover:text-black"
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
