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
import { ImConnection } from "react-icons/im";
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
  const [isPaused, setIsPaused] = useState(false);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const lastReadingId = useRef<number | null>(null);
  const noChangeCount = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch");
        }
        const readings = await res.json();

        //Logic: For when no new data is detected, i.e. there is no new reading 'id'
        if (readings[0]?.id === lastReadingId.current) {
          noChangeCount.current += 1;
          if (noChangeCount.current >= 5) {
            setIsPaused(true);
            return;
          }
        } else {
          noChangeCount.current = 0;
          lastReadingId.current = readings[0]?.id;
          setData(readings);
          setLastUpdate(new Date());
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    if (!isPaused) {
      fetchData();
      const interval = setInterval(fetchData, 1000);
      return () => clearInterval(interval);
    }
  }, [isPaused]);

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
          {
            label: "Temperature (°C)",
            data: data.map((d) => d.temperature),
            backgroundColor: "#DC2626",
            borderColor: "#DC2626",
            tension: 0.1,
          },
          {
            label: "Humidity (%)",
            data: data.map((d) => d.humidity),
            backgroundColor: "#2563EB",
            borderColor: "#2563EB",
            tension: 0.1,
          },
          {
            label: "Cloud Index",
            data: data.map((d) => d.cloudIndex),
            backgroundColor: "#9333EA",
            borderColor: "#9333EA",
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
              text: "Values",
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

  const latestReadings = {
    microbial: data[0]?.microbial_activity ?? "-",
    temperature: data[0]?.temperature ? data[0].temperature.toFixed(1) : "-",
    humidity: data[0]?.humidity ? data[0].humidity.toFixed(1) : "-",
    cloudIndex: data[0]?.cloudIndex ?? "-",
  };

  const lastUpdateTime = lastUpdate?.toLocaleString() ?? "No data";

  return (
    <div className="bg-white text-black min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Readings
          <span className="text-black/40 font-light text-sm">
            <div>Last updated: {lastUpdateTime}</div>
            <div>
              {isPaused ? (
                "Connection lost." //No new readings detected
              ) : (
                <span className="animate-pulse">Collecting data...</span>
              )}
            </div>
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
          <ReadingCard
            title="Microbial Activity"
            subtitle="The presence of LIVE microbes"
            value={latestReadings.microbial}
            unit="Cfu"
          />
          <ReadingCard
            title="Temperature"
            subtitle="Current environmental temperature"
            value={latestReadings.temperature}
            unit="°C"
          />
          <ReadingCard
            title="Humidity"
            subtitle="Relative humidity in the environment"
            value={latestReadings.humidity}
            unit="%"
          />
          <ReadingCard
            title="Cloud Index"
            subtitle="Current cloudiness index"
            value={latestReadings.cloudIndex}
            unit=""
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

        {isPaused && (
          <div className="fixed bottom-4 right-8">
            <button
              onClick={() => {
                setIsPaused(false);
                noChangeCount.current = 0;
              }}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-black/60 transition-colors"
            >
              <span className="flex flex-row items-center">
                <ImConnection className="mr-2" /> Reconnect
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
