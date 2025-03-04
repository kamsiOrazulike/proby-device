import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { ReadingCardProps } from "../types";

interface ThresholdConfig {
  warning: {
    min?: number;
    max?: number;
  };
}

export const getThresholds = (sensorType: string): ThresholdConfig => {
  switch (sensorType) {
    case "Temperature":
      return {
        warning: { min: 18, max: 27 },
      };
    case "Humidity":
      return {
        warning: { min: 30, max: 70 },
      };
    case "CO2 Levels":
      return {
        warning: { min: 1.5, max: 4 },
      };
    case "pH Level":
      return {
        warning: { min: 3, max: 5 },
      };
    case "Pressure":
      return {
        warning: { min: 950, max: 1050 },
      };
    default:
      return {
        warning: {},
      };
  }
};

export const isOutsideThreshold = (
  value: number,
  thresholds: ThresholdConfig
): boolean => {
  const { warning } = thresholds;
  if (warning.min !== undefined && warning.max !== undefined) {
    return value < warning.min || value > warning.max;
  }
  return false;
};

const ReadingCard = ({
  title,
  subtitle,
  value,
  unit,
  isLarge = false,
  showChart = false,
  onToggleChart,
  children,
}: ReadingCardProps) => {
  const isPHCard = title === "pH Level";
  const isCO2Card = title === "CO2 Levels";

  const displayValue = isPHCard ? "3.5" : isCO2Card ? "3.2" : value;
  const displayUnit = isCO2Card ? "ppm/min" : unit;

  const numericValue = Number(displayValue);
  const thresholds = getThresholds(title);

  const getAlertLevel = (value: number): "normal" | "warning" => {
    if (isNaN(value)) return "normal";
    return isOutsideThreshold(value, thresholds) ? "warning" : "normal";
  };

  const alertLevel = getAlertLevel(numericValue);

  return (
    <div className="w-full space-y-4">
      <div
        className={`p-5 rounded-xl border ${
          alertLevel === "warning"
            ? "bg-yellow-50 border-yellow-200"
            : "bg-green-50 border-green-200"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h3
              className={`font-medium ${
                isLarge ? "text-2xl" : "text-lg"
              } text-gray-900 mb-1`}
            >
              {title}
            </h3>
            <p className="text-gray-500 text-sm">{subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-1">
              <div
                className={`font-semibold ${
                  isLarge ? "text-3xl" : "text-2xl"
                } ${
                  alertLevel === "warning"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >
                {displayValue}
              </div>
              <div className="text-sm text-gray-500">{displayUnit}</div>
            </div>

            {onToggleChart && (
              <button
                onClick={onToggleChart}
                className={`px-3 py-1 rounded-lg flex items-center gap-1 text-sm ${
                  alertLevel === "warning"
                    ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                } transition-colors`}
              >
                {showChart ? (
                  <>
                    Hide Chart
                    <AiOutlineArrowUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View Chart
                    <AiOutlineArrowDown className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {alertLevel === "warning" && (
          <div className="mt-3 text-sm text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full inline-block">
            Outside optimal range
          </div>
        )}
      </div>

      {showChart && (
        <div className="w-full transition-all duration-300 ease-in-out bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

export default ReadingCard;
