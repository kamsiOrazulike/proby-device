"use client";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePoweroff, AiOutlineWifi } from "react-icons/ai";
import { SensorReading } from "../types";
import { Modal, ConfirmModal } from "./components/Modal";
import ReadingCard from "./components/ReadingCard";
import ReadingChart from "./components/ReadingChart";
import Notification from "../dashboard/components/Notification";

export default function Dashboard() {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [activeChart, setActiveChart] = useState<{
    isOpen: boolean;
    title: string;
    dataKey: keyof SensorReading;
    color: string;
  } | null>(null);
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

  const latestReadings = {
    temperature: data[0]?.temperature ? data[0].temperature.toFixed(1) : "-",
    humidity: data[0]?.humidity ? data[0].humidity.toFixed(1) : "-",
    pressure: data[0]?.pressure ? data[0].pressure.toFixed(1) : "-",
    voc_index: data[0]?.voc_index ?? "-",
    ph: data[0]?.ph ? data[0].ph.toFixed(2) : "-",
  };

  const getConnectionStatus = () => {
    if (isPaused) return "Device not found.";
    if (isConnected)
      return (
        <span className="text-green-500 text-md animate-pulse">
          • Connected
        </span>
      );
    return (
      <span className="text-md animate-pulse">Searching for device...</span>
    );
  };

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
    <div className="bg-[#36357F] text-white min-h-screen pt-24 md:pt-28 px-4 sm:px-8">
      <main className="w-full mx-auto">
        {/* Animation */}
        <div className="w-full h-[300px] flex flex-col md:flex-row gap-4">
          <div className="w-full h-full md:w-1/2 bg-hero-model bg-center bg-contain bg-no-repeat relative">
            <div className="absolute top-4 left-4">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="text-red-500 hover:text-red-400 transition-all duration-150"
              >
                <AiOutlinePoweroff className="w-8 h-8" />
              </button>
            </div>
            <div className="absolute bottom-4 right-4">
              <span className="text-[#FF7737] font-light text-sm">
                {getConnectionStatus()}
              </span>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <Notification data={data} />
          </div>
        </div>

        {/* Confirm Modal */}
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={clearData}
          title="Clear Historical Data"
          message="Are you sure you want to clear all historical data? This action cannot be undone."
        />

        {/* Reading Cards */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <ReadingCard
            title="Temperature"
            subtitle="Current environmental temperature"
            value={latestReadings.temperature}
            unit="°C"
            onViewChart={() =>
              setActiveChart({
                isOpen: true,
                title: "Temperature",
                dataKey: "temperature",
                color: "#FF7737",
              })
            }
          />
          <ReadingCard
            title="Humidity"
            subtitle="Relative humidity in the environment"
            value={latestReadings.humidity}
            unit="%"
            onViewChart={() =>
              setActiveChart({
                isOpen: true,
                title: "Humidity",
                dataKey: "humidity",
                color: "#FF7737",
              })
            }
          />
          <ReadingCard
            title="CO2 Levels"
            subtitle="CO2 Levels in environment"
            value={latestReadings.voc_index}
            unit=""
            onViewChart={() =>
              setActiveChart({
                isOpen: true,
                title: "VOC Index",
                dataKey: "voc_index",
                color: "#FF7737",
              })
            }
          />
          <ReadingCard
            title="pH Level"
            subtitle="Acidity/Alkalinity measurement"
            value={latestReadings.ph}
            unit=""
            onViewChart={() =>
              setActiveChart({
                isOpen: true,
                title: "pH Level",
                dataKey: "ph",
                color: "#FF7737",
              })
            }
          />
          <ReadingCard
            title="Pressure"
            subtitle="Atmospheric pressure"
            value={latestReadings.pressure}
            unit="hPa"
            onViewChart={() =>
              setActiveChart({
                isOpen: true,
                title: "Pressure",
                dataKey: "pressure",
                color: "#FF7737",
              })
            }
          />
        </div>

        {/* Chart Modal */}
        <Modal
          isOpen={activeChart?.isOpen ?? false}
          onClose={() => setActiveChart(null)}
        >
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">
              {activeChart?.title} History
            </h2>
            <div className="overflow-x-auto">
              {activeChart && (
                <ReadingChart
                  data={data}
                  label={activeChart.title}
                  dataKey={activeChart.dataKey}
                />
              )}
            </div>
          </div>
        </Modal>

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
                uniqueIdsCount.current.clear();
                setIsConnected(false);
              }}
              className="bg-[#FF7737]/60 text-white px-4 py-2 rounded-full hover:bg-[#FF7737] transition-colors"
            >
              <span className="flex flex-row items-center">
                <AiOutlineWifi className="mr-2" /> Reconnect
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
