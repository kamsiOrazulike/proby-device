"use client";
import { useEffect, useState, useRef } from "react";
import { SensorReading } from "../types";
import Notification from "../components/Notification";

export default function Dashboard() {
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

  const handleReconnect = () => {
    setIsPaused(false);
    noChangeCount.current = 0;
    uniqueIdsCount.current.clear();
    setIsConnected(false);
  };

  return (
    <div className="bg-gradient-to-t from-[#5252AE] to-[#2C3192] text-white min-h-screen pt-24 md:pt-28 px-4 sm:px-8">
      <main className="w-full mx-auto">
        <div className="w-full flex flex-col justify-center gap-4">
          <div className="w-full h-[500px] bg-hero-model bg-center md:bg-left bg-contain bg-no-repeat" />

          <div className="absolute w-full md:w-1/2 right-0">
            <Notification
              data={data}
              isPaused={isPaused}
              isConnected={isConnected}
              onReconnect={handleReconnect}
              onClearData={() => setData([])}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}
      </main>
    </div>
  );
}
