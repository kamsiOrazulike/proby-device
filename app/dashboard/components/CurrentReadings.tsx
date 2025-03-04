import React from 'react';
import { SensorReading } from "../../types";

interface CurrentReadingsProps {
  data: SensorReading[];
  onToggleChart: (key: string) => void;
}

const CurrentReadings: React.FC<CurrentReadingsProps> = ({ data, onToggleChart }) => {
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
        return key;
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
      <div className="bg-gray-100 p-4 rounded-xl text-gray-700 text-center">
        <p className="mb-2 font-medium">No sensor data available</p>
        <p className="text-sm text-gray-500">
          Connect your device to see real-time fermentation data
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {[...Object.keys(data[0] || {})]
        .filter((key) => key !== "id" && key !== "created_at")
        .map((key) => {
          const sensorKey = key as keyof SensorReading;
          const title = getSensorTitle(sensorKey);
          const unit = getSensorUnit(sensorKey);
          const value = getReadingValue(sensorKey);

          return (
            <div 
              key={key}
              className="bg-green-50 rounded-xl p-4 border border-green-200"
              onClick={() => onToggleChart(key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ 
                      backgroundColor: 
                        sensorKey === "temperature" ? "#F87171" :
                        sensorKey === "humidity" ? "#3B82F6" :
                        sensorKey === "voc_index" ? "#10B981" :
                        sensorKey === "ph" ? "#8B5CF6" :
                        sensorKey === "pressure" ? "#F59E0B" : "#CBD5E1"
                    }}
                  >
                    {title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{title}</h3>
                    <p className="text-xs text-gray-500">Current Reading</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-semibold text-gray-900">
                    {value}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default CurrentReadings;