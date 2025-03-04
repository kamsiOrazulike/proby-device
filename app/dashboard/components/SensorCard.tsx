import React from "react";
import { SensorReading } from "../../types";
import {
  getThresholds,
  isOutsideThreshold,
} from "../../components/ReadingCard";

interface SensorCardProps {
  sensorKey: keyof SensorReading;
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  icon,
  onClick,
}) => {
  const numValue = Number(value);
  const thresholds = getThresholds(title);
  const isWarning = isOutsideThreshold(numValue, thresholds);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md ${
        isWarning
          ? "bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200"
          : "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
      }`}
      onClick={onClick}
    >
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {icon}
            <div>
              <h3 className="font-medium text-gray-900">{title}</h3>
              <p className="text-xs text-gray-500">Current Reading</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-baseline">
              <span
                className={`text-2xl font-semibold ${
                  isWarning ? "text-yellow-700" : "text-green-700"
                }`}
              >
                {value}
              </span>
              <span className="ml-1 text-sm text-gray-500">{unit}</span>
            </div>
            {isWarning && (
              <span className="mt-1 text-xs text-yellow-600 bg-yellow-100 px-2 py-0.5 rounded-full">
                Outside range
              </span>
            )}
          </div>
        </div>
      </div>
      <div
        className={`h-1.5 w-full ${
          isWarning ? "bg-yellow-400" : "bg-green-400"
        }`}
      ></div>
    </div>
  );
};

export default SensorCard;
