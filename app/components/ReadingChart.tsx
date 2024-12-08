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

const getScaleConfig = (dataKey: string) => {
  const defaultScale = {
    min: undefined,
    max: undefined,
  };

  switch (dataKey) {
    case "temperature":
      return {
        min: 15,
        max: 30,
      };
    case "humidity":
      return {
        min: 0,
        max: 100,
      };
    case "pressure":
      return {
        min: 900,
        max: 1100,
      };
    case "voc_index":
      return {
        min: 0,
        max: 500,
      };
    case "ph":
      return {
        min: 0,
        max: 8,
      };
    default:
      return defaultScale;
  }
};

const ReadingChart = ({ data, label, dataKey }: ChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<ChartJS | null>(null);

  const resetZoom = () => {
    if (chartInstance.current) {
      chartInstance.current.resetZoom();
    }
  };

  // Mock pH data function
  const getMockPhData = (): MockPhData[] => {
    const mockData: MockPhData[] = [
      { created_at: new Date(2024, 0, 1, 0, 2).toISOString(), ph: 6.8 },
      { created_at: new Date(2024, 0, 1, 0, 4).toISOString(), ph: 6.5 },
      { created_at: new Date(2024, 0, 1, 0, 12).toISOString(), ph: 6.6 },
      { created_at: new Date(2024, 0, 1, 0, 14).toISOString(), ph: 6.9 },
      { created_at: new Date(2024, 0, 1, 0, 24).toISOString(), ph: 4.7 },
      { created_at: new Date(2024, 0, 1, 0, 26).toISOString(), ph: 4.4 },
      { created_at: new Date(2024, 0, 1, 0, 48).toISOString(), ph: 3.7 },
      { created_at: new Date(2024, 0, 1, 0, 50).toISOString(), ph: 3.6 },
      { created_at: new Date(2024, 0, 1, 0, 60).toISOString(), ph: 3.6 },
      { created_at: new Date(2024, 0, 1, 0, 62).toISOString(), ph: 3.6 },
      { created_at: new Date(2024, 0, 1, 0, 72).toISOString(), ph: 3.6 },
      { created_at: new Date(2024, 0, 1, 0, 74).toISOString(), ph: 3.6 },
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

    // Use mock data for pH, real data for others
    const sourceData = dataKey === "ph" ? getMockPhData() : data;
    const sortedData = [...sourceData].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    // Calculate time elapsed
    const startTime = new Date(sortedData[0].created_at).getTime();
    const endTime = new Date(
      sortedData[sortedData.length - 1].created_at
    ).getTime();
    const totalMinutesElapsed = (endTime - startTime) / 60000;
    const isLongDuration = totalMinutesElapsed >= 360; // 6 hours or more

    const getTimeElapsed = (timestamp: string) => {
      const elapsed = new Date(timestamp).getTime() - startTime;
      // For pH mock data, always show in minutes
      if (dataKey === "ph") {
        return Math.round(elapsed / 60000).toString();
      }
      // Original time formatting for other data
      if (isLongDuration) {
        return (elapsed / 3600000).toFixed(1); // Convert to hours
      }
      return (elapsed / 60000).toFixed(1); // Keep as minutes
    };

    const formattedChartData: ChartData<"line"> = {
      labels: sortedData.map((d) => getTimeElapsed(d.created_at)),
      datasets: [
        {
          label,
          data: sortedData.map((d) => Number(d[dataKey])),
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
            text: dataKey === "ph" ? "pH Level" : "Value",
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
          min: 0,
          max:
            dataKey === "ph"
              ? 75
              : isLongDuration
              ? Math.ceil(totalMinutesElapsed / 60)
              : Math.ceil(totalMinutesElapsed),
          title: {
            display: true,
            text: "Time Elapsed (minutes)",
            color: "white",
            font: { size: 12 },
          },
          ticks: {
            color: "white",
            font: { size: 11 },
            stepSize: dataKey === "ph" ? 12 : isLongDuration ? 6 : 1,
            callback: function (value) {
              return value.toString();
            },
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
            x: {
              min: "original",
              max: "original",
            },
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
            title: function (tooltipItems) {
              const value = Number(tooltipItems[0].label);
              return `Time: ${value} minutes`;
            },
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            },
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
    <div className="space-y-4">
      <div className="min-w-[600px] h-[300px] sm:h-[400px]">
        <canvas ref={chartRef} />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetZoom}
          className="px-4 py-2 bg-[#FF7737] text-white rounded hover:bg-[#FF9966] transition-colors"
        >
          Reset View
        </button>
      </div>
      <div className="text-center text-white/60 text-sm">
        Last reading recorded:{" "}
        {data.length > 0
          ? new Date(data[0].created_at).toLocaleString()
          : "No readings available"}
      </div>
    </div>
  );
};

export default ReadingChart;
