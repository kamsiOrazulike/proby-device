"use client";
import { useEffect, useState, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import type { SensorReading } from "../types";
import { ReadingCard } from "./ReadingCards";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

export default function Dashboard() {
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const lastDataLength = useRef(0);
  const unchangedCount = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!isFetching) return;

      try {
        const res = await fetch("/api/readings");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch");
        }
        const readings = await res.json();

        // Check if we have the same data as before
        if (readings.length === lastDataLength.current) {
          unchangedCount.current += 1;

          // If data hasn't changed for 10 consecutive checks (10 seconds with 1s interval)
          if (unchangedCount.current >= 10) {
            console.log("No new data detected for 10 seconds, stopping fetch");
            setIsFetching(false);
            return;
          }
        } else {
          // Reset counter if data has changed
          unchangedCount.current = 0;
          lastDataLength.current = readings.length;
        }

        setData(readings);
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        // Optional: stop fetching on error
        // setIsFetching(false);
      }
    };

    if (isFetching) {
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }
  }, [isFetching]);

  // Function to manually restart fetching
  const restartFetching = () => {
    unchangedCount.current = 0;
    setIsFetching(true);
  };

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => new Date(d.created_at).toLocaleTimeString()),
        datasets: [
          {
            label: "Microbial Activity (Cfu)",
            data: data.map((d) => d.microbial_activity),
            backgroundColor: "#066E19",
            borderColor: "#066E19",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        scales: {
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: "Colony Forming Units (Cfu)",
            },
          },
          x: {
            title: {
              display: true,
              text: "Time",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  const latestReading = data[0]?.microbial_activity ?? "-";
  const lastUpdateTime = lastUpdate?.toLocaleString() ?? "No data";

  return (
    <div className="bg-gray-200 text-black min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Readings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 my-12">
          <ReadingCard
            title="Microbial Activity"
            subtitle="The presence of microbes picked up by the sensor"
            value={latestReading}
            unit="Cfu"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] h-[300px] sm:h-[400px] my-12">
            <canvas ref={chartRef} />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Error: {error}
          </div>
        )}

        {!isFetching && (
          <div className="flex justify-center mt-4">
            <button
              onClick={restartFetching}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Resume Data Collection
            </button>
          </div>
        )}
      </main>

      <footer className="mt-2 text-center text-sm">
        <div>Last updated: {lastUpdateTime}</div>
        <div className="mt-1">
          Status: {isFetching ? "Collecting data..." : "Data collection paused"}
        </div>
      </footer>
    </div>
  );
}
