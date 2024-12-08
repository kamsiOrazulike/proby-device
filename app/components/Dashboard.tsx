"use client";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePoweroff } from "react-icons/ai";
import { SensorReading } from "../types";
import { ConfirmModal } from "../components/Modal";
import Notification from "../components/Notification";

export default function Dashboard() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const lastReadingId = useRef<number | null>(null);
  const noChangeCount = useRef(0);
  const uniqueIdsCount = useRef(new Set<number>());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch");
        }
        const readings = await res.json();

        if (readings[0]?.id === lastReadingId.current) {
          noChangeCount.current += 1;
          if (noChangeCount.current >= 5) {
            setIsPaused(true);
            setIsConnected(false);
            return;
          }
        } else {
          noChangeCount.current = 0;
          lastReadingId.current = readings[0]?.id;
          uniqueIdsCount.current.add(readings[0]?.id);
          if (uniqueIdsCount.current.size >= 3) {
            setIsConnected(true);
          }
          setData(readings);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        setIsConnected(false);
      }
    };

    if (!isPaused) {
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const clearData = async () => {
    try {
      const response = await fetch("/api/readings", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear data");
      }

      setData([]);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to clear data");
      console.error("Clear data error:", error);
    }
  };

  return (
    <div className="bg-gradient-to-t from-[#5252AE] to-[#2C3192] text-white min-h-screen pt-24 md:pt-28 px-4 sm:px-8">
      <main className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="text-red-500 hover:text-red-400 transition-all duration-150"
          >
            <AiOutlinePoweroff className="w-8 h-8" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
          {/* Device Image */}
          <div className="w-full md:w-1/2">
            <div className="w-full h-[500px] bg-hero-model bg-center bg-contain bg-no-repeat rounded-lg" />
          </div>

          {/* Notifications */}
          <div className="w-full md:w-1/2">
            <Notification
              data={data}
              isPaused={isPaused}
              isConnected={isConnected}
              onReconnect={() => {
                setIsPaused(false);
                noChangeCount.current = 0;
                uniqueIdsCount.current.clear();
                setIsConnected(false);
              }}
            />
          </div>
        </div>

        {/* Modals and Errors */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={clearData}
          title="Clear Historical Data"
          message="Are you sure you want to clear all historical data? This action cannot be undone."
        />

        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}
      </main>
    </div>
  );
}
