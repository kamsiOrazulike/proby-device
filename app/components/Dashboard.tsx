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
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch");
        }
        const readings = await res.json();
        setData(readings);
        setLastUpdate(new Date());
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

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
  };

  const lastUpdateTime = lastUpdate?.toLocaleString() ?? "No data";

  return (
    <div className="bg-gray-200 text-black min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="flex flex-col text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Readings
          <span className="text-sm font-light">Last updated: {lastUpdateTime}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
          <ReadingCard
            title="Microbial Activity"
            subtitle="The presence of microbes picked up by the sensor"
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
      </main>
    </div>
  );
}
