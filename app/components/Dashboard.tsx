import { useEffect, useState, useRef } from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { SensorReading } from "../types";
import Modal from "./Modal";
import ReadingCard from "./ReadingCard";
import ReadingChart from "./ReadingChart";

export default function Dashboard() {
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeChart, setActiveChart] = useState<{
    isOpen: boolean;
    title: string;
    dataKey: keyof SensorReading;
    color: string;
  } | null>(null);
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

  const latestReadings = {
    microbial: data[0]?.microbial_activity ?? "-",
    temperature: data[0]?.temperature ? data[0].temperature.toFixed(1) : "-",
    humidity: data[0]?.humidity ? data[0].humidity.toFixed(1) : "-",
    cloud_index: data[0]?.cloud_index ?? "-",
  };

  const lastUpdateTime = lastUpdate?.toLocaleString() ?? "No data";

  return (
    <div className="bg-[#36357F] text-white min-h-screen p-4 sm:p-8">
      <main className="max-w-7xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold -mt-2">
          Sensor Readings
          <span className="text-[#FF7737] font-light text-sm">
            <div>
              {isPaused ? (
                "Device not found."
              ) : (
                <span className="animate-pulse">Searching...</span>
              )}
            </div>
          </span>
        </h1>

        <div className="flex flex-col gap-4 my-12">
          <div className="w-full">
            <ReadingCard
              title="Microbial Activity"
              subtitle="The presence of LIVE microbes"
              value={latestReadings.microbial}
              unit="Cfu"
              isLarge={true}
              onViewChart={() =>
                setActiveChart({
                  isOpen: true,
                  title: "Microbial Activity",
                  dataKey: "microbial_activity",
                  color: "#FF7737",
                })
              }
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              title="Cloud Index"
              subtitle="Current cloudiness index"
              value={latestReadings.cloud_index}
              unit=""
              onViewChart={() =>
                setActiveChart({
                  isOpen: true,
                  title: "Cloud Index",
                  dataKey: "cloud_index",
                  color: "#FF7737",
                })
              }
            />
          </div>
        </div>

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
            <div className="text-center mt-16 font-light text-xs">
              Last updated: {lastUpdateTime}
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
              }}
              className="bg-[#FF7737]/60 text-white px-4 py-2 rounded-full hover:bg-[#FF7737] transition-colors"
            >
              <span className="flex flex-row items-center">
                <AiOutlineWifi className="mr-2" /> Search Devices
              </span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
