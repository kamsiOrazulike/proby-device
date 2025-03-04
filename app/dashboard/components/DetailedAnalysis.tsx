import React, { useEffect } from "react";
import { SensorReading } from "../../types";
import ReadingCard from "../../components/ReadingCard";
import ReadingChart from "../../components/ReadingChart";

interface DetailedAnalysisProps {
  data: SensorReading[];
  expandedCharts: Record<string, boolean>;
  toggleChart: (key: string) => void;
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({
  data,
  expandedCharts,
  toggleChart,
}) => {
  useEffect(() => {
    if (data.length > 0) {
      const sensorKeys = Object.keys(data[0] || {}).filter(
        (key) => key !== "id" && key !== "created_at"
      );

      sensorKeys.forEach((key) => {
        if (!expandedCharts[key]) {
          toggleChart(key);
        }
      });
    }
  }, [data, expandedCharts, toggleChart]);

  const getSensorUnit = (key: keyof SensorReading): string => {
    switch (key) {
      case "temperature":
        return "°C";
      case "humidity":
        return "%";
      case "pressure":
        return "hPa";
      case "voc_index":
        return "ppm";
      default:
        return "";
    }
  };

  const getSensorTitle = (key: keyof SensorReading): string => {
    switch (key) {
      case "temperature":
        return "Temperature";
      case "humidity":
        return "Humidity";
      case "voc_index":
        return "CO2 Levels";
      case "ph":
        return "pH Level";
      case "pressure":
        return "Pressure";
      default:
        return key as string;
    }
  };

  const getReadingValue = (key: keyof SensorReading): string => {
    if (!data.length) return "-";
    const value = data[0][key];
    if (typeof value === "number") {
      return key === "ph" ? value.toFixed(2) : value.toFixed(1);
    }
    return value?.toString() || "-";
  };

  if (data.length === 0) {
    return (
      <div className="bg-gray-100 p-6 rounded-xl text-gray-700 text-center">
        <p className="mb-2 font-medium">No historical data available</p>
        <p className="text-sm text-gray-500">
          Data will appear here once your device starts sending readings
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {[...Object.keys(data[0] || {})]
        .filter((key) => key !== "id" && key !== "created_at")
        .map((key) => {
          const title = getSensorTitle(key as keyof SensorReading);
          const unit = getSensorUnit(key as keyof SensorReading);

          return (
            <div
              key={key}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg text-gray-900">
                  {title} Analysis
                </h3>
              </div>
              <div className="p-4">
                <ReadingCard
                  title={title}
                  subtitle="Historical Data"
                  value={getReadingValue(key as keyof SensorReading)}
                  unit={unit}
                  isLarge={true}
                  showChart={expandedCharts[key]}
                  onToggleChart={() => toggleChart(key)} 
                >
                  {expandedCharts[key] && (
                    <ReadingChart
                      data={data}
                      label={title}
                      dataKey={key as keyof SensorReading}
                    />
                  )}
                </ReadingCard>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default DetailedAnalysis;
