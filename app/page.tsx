"use client";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import About from "./components/Alerts";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"home" | "data">("home");

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab("home");
  };

  return (
    <div className="w-full bg-white text-black min-h-screen">
      {/* Logo */}
      <div
        onClick={handleHomeClick}
        className="cursor-pointer fixed top-[1rem] left-[1rem]"
      >
        <Image src="./static/logo.svg" width={30} height={30} alt="logo" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="w-full flex flex-row justify-center relative mb-12">
          <button
            onClick={() => setActiveTab("home")}
            className={`mr-1 px-4 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "home"
                ? "text-black"
                : "text-black/20 hover:text-black"
            }`}
          >
            About Us
          </button>
          <button
            onClick={() => setActiveTab("data")}
            className={`px-4 py-2 rounded-full transition-colors duration-150 ${
              activeTab === "data"
                ? "text-black"
                : "text-black/20 hover:text-black"
            }`}
          >
            Dashboard (Demo)
          </button>
        </div>

        {activeTab === "home" ? <About /> : <Dashboard />}
      </div>
    </div>
  );
}
