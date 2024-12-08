import React from "react";
import { AiOutlineLineChart } from "react-icons/ai";
import { ReadingCardProps } from "../types";

const ReadingCard = ({
  title,
  subtitle,
  value,
  unit,
  isLarge = false,
  onViewChart,
}: ReadingCardProps) => {
  const isPHCard = title === "pH Level";
  const displayValue = isPHCard ? "3.5" : value;

  return (
    <div
      className={`border border-[#FF7737] bg-transparent p-6 shadow-sm ${
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
              {displayValue}
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

export default ReadingCard;
