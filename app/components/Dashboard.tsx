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

export default function Home() {
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.map((d) => d.timestamp),
        datasets: [
          {
            label: "Temperature (°C)",
            data: data.map((d) => d.temperature),
            backgroundColor: "rgb(255, 99, 132)",
            tension: 0.1,
          },
          {
            label: "Humidity (%)",
            data: data.map((d) => d.humidity),
            backgroundColor: "rgb(54, 162, 235)",
            tension: 0.1,
          },
          {
            label: "Pressure (hPa)",
            data: data.map((d) => d.pressure),
            backgroundColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: false,
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

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) throw new Error("Failed to fetch");
        const readings: SensorReading[] = await res.json();
        setData(readings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    const ws = new WebSocket(
      process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000"
    );

    ws.onmessage = (event: MessageEvent): void => {
      try {
        const newReading: SensorReading = JSON.parse(event.data);
        setData((prev) => [...prev.slice(-49), newReading]);
      } catch (err) {
        setError("Error processing websocket data");
      }
    };

    fetchData();
    return () => ws.close();
  }, []);

  return (
    <div className="bg-yellow-200 text-black min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Dashboard
        </h1>

        {/* Cards - stack on mobile, grid on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-12">
          <ReadingCard
            title="Temperature"
            value={data[data.length - 1]?.temperature ?? "-"}
            unit="°C"
          />
          <ReadingCard
            title="Humidity"
            value={data[data.length - 1]?.humidity ?? "-"}
            unit="%"
          />
          <ReadingCard
            title="Microbial Activity"
            value={data[data.length - 1]?.pressure ?? "-"}
            unit="Cfu"
          />
        </div>

        {/* Scrollable chart container */}
        <div className="overflow-x-auto">
          <div className="min-w-[600px] h-[300px] sm:h-[400px] my-12">
            <canvas ref={chartRef} />
          </div>
        </div>

        {error && <div className="text-red-500">Error: {error}</div>}
      </main>

      <footer className="mt-8 text-center text-sm">
        Last updated: {data[data.length - 1]?.timestamp || "No data"}
      </footer>
    </div>
  );
}
