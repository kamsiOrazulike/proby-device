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
        warning: { min: 18, max: 25 },
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
        warning: { min: 4, max: 7 },
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

  const displayUnit = isCO2Card ? "10⁻⁹ mL/cell" : unit;

  const numericValue = Number(displayValue);
  const thresholds = getThresholds(title);

  const getAlertLevel = (value: number): "normal" | "warning" => {
    if (isNaN(value)) return "normal";
    return isOutsideThreshold(value, thresholds) ? "warning" : "normal";
  };

  const getCardStyles = (alertLevel: string) => {
    const baseStyles = "p-6 shadow-sm transition-colors duration-300";

    switch (alertLevel) {
      case "warning":
        return `${baseStyles} bg-yellow-500/20 border border-yellow-500`;
      case "normal":
        return `${baseStyles} bg-green-500/20 border border-green-500`;
      default:
        return `${baseStyles} border border-[#FF7737] bg-transparent`;
    }
  };

  const getTextColor = (alertLevel: string) => {
    switch (alertLevel) {
      case "warning":
        return "text-yellow-500";
      case "normal":
        return "text-green-500";
      default:
        return "text-white";
    }
  };

  const alertLevel = getAlertLevel(numericValue);
  const cardStyles = getCardStyles(alertLevel);
  const textColor = getTextColor(alertLevel);

  return (
    <div className="w-full space-y-4">
      <div className={cardStyles}>
        <div className="flex justify-start md:justify-between items-center">
          <div className="flex flex-col">
            <h3
              className={`font-bold ${isLarge ? "text-3xl" : "text-md"} mb-1`}
            >
              {title}
            </h3>
            <p className="text-white/50 text-sm font-thin">{subtitle}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <div
                className={`font-bold ${
                  isLarge ? "text-5xl" : "text-2xl"
                } ${textColor}`}
              >
                {displayValue}
              </div>
              <div className="text-sm opacity-75">{displayUnit}</div>
            </div>

            {onToggleChart && (
              <button
                onClick={onToggleChart}
                className="text-white/60 hover:text-white transition-colors p-2 flex items-center gap-2 text-sm"
              >
                {showChart ? (
                  <>
                    Close Chart
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
          <div className={`mt-4 text-sm ${textColor}`}>
            {`${title} is outside optimal range`}
          </div>
        )}
      </div>

      {showChart && (
        <div className="w-full transition-all duration-300 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default ReadingCard;
