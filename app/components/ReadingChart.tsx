"use client";
import { useEffect, useRef } from "react";
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
import zoomPlugin from "chartjs-plugin-zoom";
import { ChartProps } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  zoomPlugin
);

type MockPhData = {
  created_at: string;
  ph: number;
  temperature?: never;
  humidity?: never;
  pressure?: never;
  voc_index?: never;
  id?: never;
};

type MockCO2Data = {
  created_at: string;
  voc_index: number;
  temperature?: never;
  humidity?: never;
  pressure?: never;
  ph?: never;
  id?: never;
};

const getScaleConfig = (dataKey: string) => {
  const defaultScale = {
    min: undefined,
    max: undefined,
  };

  switch (dataKey) {
    case "temperature":
      return { min: 15, max: 30 };
    case "humidity":
      return { min: 0, max: 100 };
    case "pressure":
      return { min: 900, max: 1100 };
    case "voc_index":
      return { min: 0, max: 4.5 };
    case "ph":
      return { min: 0, max: 8 };
    default:
      return defaultScale;
  }
};

const getAxisLabel = (dataKey: string): string => {
  switch (dataKey) {
    case "temperature":
      return "Temperature (°C)";
    case "humidity":
      return "Humidity (%)";
    case "pressure":
      return "Pressure (hPa)";
    case "voc_index":
      return "CO₂ Production Rate (10⁻⁹ mL/cell)";
    case "ph":
      return "pH Level";
    default:
      return "Value";
  }
};

const convertToHours = (minutes: number) => minutes / 60;

const ReadingChart = ({ data, label, dataKey }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  const resetZoom = () => {
    if (chartInstance.current) {
      chartInstance.current.resetZoom();
    }
  };

  const getMockPhData = (): MockPhData[] => {
    const baseTime = new Date(2024, 0, 1, 0, 0, 0);
    const mockData: MockPhData[] = [
      {
        created_at: new Date(baseTime.getTime() + 2 * 60000).toISOString(),
        ph: 6.8,
      },
      {
        created_at: new Date(baseTime.getTime() + 4 * 60000).toISOString(),
        ph: 6.5,
      },
      {
        created_at: new Date(baseTime.getTime() + 12 * 60000).toISOString(),
        ph: 6.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 14 * 60000).toISOString(),
        ph: 6.9,
      },
      {
        created_at: new Date(baseTime.getTime() + 24 * 60000).toISOString(),
        ph: 4.7,
      },
      {
        created_at: new Date(baseTime.getTime() + 26 * 60000).toISOString(),
        ph: 4.4,
      },
      {
        created_at: new Date(baseTime.getTime() + 48 * 60000).toISOString(),
        ph: 3.7,
      },
      {
        created_at: new Date(baseTime.getTime() + 50 * 60000).toISOString(),
        ph: 3.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 60 * 60000).toISOString(),
        ph: 3.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 62 * 60000).toISOString(),
        ph: 3.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 72 * 60000).toISOString(),
        ph: 3.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 74 * 60000).toISOString(),
        ph: 3.6,
      },
    ];
    return mockData;
  };

  const getMockCO2Data = (): MockCO2Data[] => {
    const baseTime = new Date(2024, 0, 1, 0, 0, 0);
    const mockData: MockCO2Data[] = [
      {
        created_at: new Date(baseTime.getTime() + 0 * 60000).toISOString(),
        voc_index: 0,
      },
      {
        created_at: new Date(baseTime.getTime() + 5 * 60000).toISOString(),
        voc_index: 0,
      },
      {
        created_at: new Date(baseTime.getTime() + 10 * 60000).toISOString(),
        voc_index: 0.1,
      },
      {
        created_at: new Date(baseTime.getTime() + 15 * 60000).toISOString(),
        voc_index: 0.2,
      },
      {
        created_at: new Date(baseTime.getTime() + 20 * 60000).toISOString(),
        voc_index: 0.5,
      },
      {
        created_at: new Date(baseTime.getTime() + 25 * 60000).toISOString(),
        voc_index: 1.0,
      },
      {
        created_at: new Date(baseTime.getTime() + 30 * 60000).toISOString(),
        voc_index: 1.5,
      },
      {
        created_at: new Date(baseTime.getTime() + 35 * 60000).toISOString(),
        voc_index: 2.0,
      },
      {
        created_at: new Date(baseTime.getTime() + 40 * 60000).toISOString(),
        voc_index: 2.3,
      },
      {
        created_at: new Date(baseTime.getTime() + 45 * 60000).toISOString(),
        voc_index: 2.6,
      },
      {
        created_at: new Date(baseTime.getTime() + 50 * 60000).toISOString(),
        voc_index: 2.8,
      },
      {
        created_at: new Date(baseTime.getTime() + 55 * 60000).toISOString(),
        voc_index: 3.0,
      },
      {
        created_at: new Date(baseTime.getTime() + 60 * 60000).toISOString(),
        voc_index: 3.1,
      },
      {
        created_at: new Date(baseTime.getTime() + 65 * 60000).toISOString(),
        voc_index: 3.2,
      },
      {
        created_at: new Date(baseTime.getTime() + 70 * 60000).toISOString(),
        voc_index: 3.3,
      },
    ];
    return mockData;
  };

  useEffect(() => {
    if (!chartRef.current || !data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const sourceData =
      dataKey === "ph"
        ? getMockPhData()
        : dataKey === "voc_index"
        ? getMockCO2Data()
        : data;

    const sortedData = [...sourceData].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const startTime = new Date(sortedData[0].created_at).getTime();
    const getTimeElapsed = (timestamp: string): number => {
      const elapsed = new Date(timestamp).getTime() - startTime;
      return elapsed / (60 * 1000); // Convert to minutes
    };

    const formattedChartData: ChartData<"line", { x: number; y: number }[]> = {
      datasets: [
        {
          label,
          data: sortedData.map((d) => ({
            x:
              dataKey === "ph" || dataKey === "voc_index"
                ? getTimeElapsed(d.created_at)
                : convertToHours(getTimeElapsed(d.created_at)),
            y: Number(d[dataKey]),
          })),
          backgroundColor: "#FF7737",
          borderColor: "#FF7737",
          tension: 0.1,
          pointBackgroundColor: "#FF7737",
          pointBorderColor: "#FF7737",
          pointHoverBackgroundColor: "#FF9966",
          pointHoverBorderColor: "#FF9966",
          pointRadius: 1,
        },
      ],
    };

    const options: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 0 },
      scales: {
        y: {
          ...getScaleConfig(dataKey),
          beginAtZero: false,
          title: {
            display: true,
            text: getAxisLabel(dataKey),
            color: "white",
            font: { size: 12 },
          },
          ticks: {
            color: "white",
            font: { size: 11 },
            stepSize: dataKey === "ph" ? 1 : undefined,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          type: "linear",
          min: 0,
          max: dataKey === "ph" || dataKey === "voc_index" ? 75 : undefined,
          title: {
            display: true,
            text:
              dataKey === "ph" || dataKey === "voc_index"
                ? "Time (minutes)"
                : "Time (hours)",
            color: "white",
            font: { size: 12 },
          },
          ticks: {
            color: "white",
            font: { size: 11 },
            stepSize: dataKey === "ph" ? 12 : undefined,
            callback: (value) => Math.round(Number(value)).toString(),
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      plugins: {
        zoom: {
          pan: {
            enabled: true,
            mode: "x",
            modifierKey: "shift",
          },
          zoom: {
            wheel: {
              enabled: true,
              speed: 0.1,
            },
            pinch: {
              enabled: true,
            },
            mode: "xy",
            drag: {
              enabled: true,
              backgroundColor: "rgba(255,119,55,0.3)",
              borderColor: "rgb(255,119,55)",
            },
          },
          limits: {
            x: { min: "original", max: "original" },
          },
        },
        legend: {
          labels: {
            color: "white",
            font: { size: 12 },
          },
        },
        tooltip: {
          titleColor: "white",
          bodyColor: "white",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "#FF7737",
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            title: (tooltipItems) => {
              const timeValue = Math.round(tooltipItems[0].parsed.x);
              const timeUnit =
                dataKey === "ph" || dataKey === "voc_index"
                  ? "minutes"
                  : "hours";
              return `Time: ${timeValue} ${timeUnit}`;
            },
            label: (context) => `${context.dataset.label}: ${context.parsed.y}`,
          },
        },
      },
    };

    chartInstance.current = new ChartJS(ctx, {
      type: "line",
      data: formattedChartData,
      options: options,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, label, dataKey]);

  return (
    <div className="w-full bg-opacity-50 rounded-lg p-4">
      <div className="relative w-full">
        <div className="md:hidden text-[#FF7737] text-sm text-center mb-2">
          ← Scroll to see more →
        </div>
        <div className="relative w-full py-4 overflow-x-auto overflow-y-hidden touch-pan-x overscroll-x-contain [&::-webkit-scrollbar]:block [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-800 [&::-webkit-scrollbar-thumb]:bg-[#FF7737] [&::-webkit-scrollbar-thumb:hover]:bg-[#FF9966]">
          <div className="min-w-[600px] w-full">
            <div className="h-[250px] sm:h-[300px]">
              <canvas ref={chartRef} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <div className="flex justify-center">
          <button
            onClick={resetZoom}
            className="px-4 py-2 bg-[#FF7737] text-white rounded hover:bg-[#FF9966] transition-colors"
          >
            Reset View
          </button>
        </div>
        <div className="text-center text-white/60 text-sm py-2">
          Last reading:{" "}
          {data.length > 0
            ? new Date(data[0].created_at).toLocaleString()
            : "No data"}
        </div>
      </div>
    </div>
  );
};

export default ReadingChart;
