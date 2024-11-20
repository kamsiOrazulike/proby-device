/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  // Fetch data every second
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) throw new Error("Failed to fetch");
        const readings = await res.json();
        setData(readings);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup
  }, []);

  // Update chart when data changes
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
        labels: data.map((d) => new Date(d.created_at).toLocaleTimeString()),
        datasets: [
          {
            label: "Microbial Activity (Cfu)",
            data: data.map((d) => d.microbial_activity),
            backgroundColor: "rgb(75, 192, 192)",
            borderColor: "rgb(75, 192, 192)",
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

  return (
    <div className="bg-yellow-200 text-black min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Readings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-4 my-12">
          <ReadingCard
            title="Microbial Activity"
            value={data[0]?.microbial_activity ?? "-"}
            unit="Cfu"
          />
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[600px] h-[300px] sm:h-[400px] my-12">
            <canvas ref={chartRef} />
          </div>
        </div>

        {error && <div className="text-red-500">Error: {error}</div>}
      </main>

      <footer className="mt-8 text-center text-sm">
        Last updated:{" "}
        {data[0]?.created_at
          ? new Date(data[0].created_at).toLocaleString()
          : "No data"}
      </footer>
    </div>
  );
}
