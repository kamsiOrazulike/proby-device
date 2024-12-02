import { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  ChartData,
  ChartOptions,
} from "chart.js";
import { AiOutlineLineChart, AiOutlineWifi } from "react-icons/ai";
import { ReadingCardProps, SensorReading, ChartProps } from "../types";
import Modal from "./Modal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

const ReadingChart = ({ data, label, dataKey, color }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chartData: ChartData<"line"> = {
      labels: data.map((d) => new Date(d.created_at).toLocaleTimeString()),
      datasets: [
        {
          label,
          data: data.map((d) => Number(d[dataKey])),
          backgroundColor: color,
          borderColor: color,
          tension: 0.1,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      scales: {
        y: {
          beginAtZero: false,
          title: { display: true, text: "Value" },
        },
        x: {
          title: { display: true, text: "Time" },
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: chartData,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, label, dataKey, color]);

  return (
    <div className="min-w-[600px] h-[300px] sm:h-[400px]">
      <canvas ref={chartRef} />
    </div>
  );
};

const ReadingCard = ({
  title,
  subtitle,
  value,
  unit,
  isLarge = false,
  onViewChart,
}: ReadingCardProps & { onViewChart?: () => void }) => {
  const isMicrobialCard = title === "Microbial Activity";
  const bgColor = isMicrobialCard
    ? Number(value) < 30
      ? "bg-red-800"
      : "bg-transparent"
    : "bg-transparent";

  return (
    <div
      className={`border border-[#FF7737] ${bgColor} p-6 shadow-sm ${
        isLarge ? "h-auto" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold ${isLarge ? "text-3xl" : "text-md"}`}>
            {title}
          </h3>
          <p className="text-white/50 text-sm font-thin mb-2">{subtitle}</p>
          <div className="flex items-baseline gap-2">
            <div className={`font-bold ${isLarge ? "text-5xl" : "text-2xl"}`}>
              {value}
            </div>
            <div className="text-sm opacity-75">{unit}</div>
          </div>
        </div>
        {onViewChart && (
          <button
            onClick={onViewChart}
            className="text-[#FF7737] hover:text-[#FF9966] transition-colors p-2"
            title={`View ${title} Chart`}
          >
            <AiOutlineLineChart className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

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
          <span className="text-white/40 font-light text-sm">
            <div>Last updated: {lastUpdateTime}</div>
            <div>
              {isPaused ? (
                "Connection lost."
              ) : (
                <span className="animate-pulse">Collecting data...</span>
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
                  color: "#066E19",
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
                  color: "#DC2626",
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
                  color: "#2563EB",
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
                  color: "#9CA3AF",
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
                  color={activeChart.color}
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
              }}
              className="bg-black text-white px-4 py-2 rounded-full hover:bg-black/60 transition-colors"
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
