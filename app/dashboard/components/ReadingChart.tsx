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
import { ChartProps } from "../../types";

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

//For Scale
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
        max: 14,
      };
    default:
      return defaultScale;
  }
};

const ReadingChart = ({ data, label, dataKey }: ChartProps) => {
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
      labels: [...data]
        .reverse()
        .map((d) => new Date(d.created_at).toLocaleTimeString()),
      datasets: [
        {
          label,
          data: [...data].reverse().map((d) => Number(d[dataKey])),
          backgroundColor: "#FF7737",
          borderColor: "#FF7737",
          tension: 0.1,
          pointBackgroundColor: "#FF7737",
          pointBorderColor: "#FF7737",
          pointHoverBackgroundColor: "#FF9966",
          pointHoverBorderColor: "#FF9966",
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
            text: "Value",
            color: "white",
            font: {
              size: 12,
            },
          },
          ticks: {
            color: "white",
            font: {
              size: 11,
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        x: {
          title: {
            display: true,
            text: "Time",
            color: "white",
            font: {
              size: 12,
            },
          },
          ticks: {
            color: "white",
            font: {
              size: 11,
            },
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 12,
            },
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
            label: function (context) {
              return `${context.dataset.label}: ${context.parsed.y}`;
            },
          },
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
  }, [data, label, dataKey]);

  return (
    <div className="min-w-[600px] h-[300px] sm:h-[400px]">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ReadingChart;
