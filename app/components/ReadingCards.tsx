import { ReadingCardProps } from "../types";

export const ReadingCard = ({
  title,
  subtitle,
  value,
  unit,
}: ReadingCardProps) => (
  <div className="border border-gray-100 bg-transparent p-6 shadow-sm">
    <h3 className="text-2xl font-bold">{title}</h3>
    <p className="text-black/50 text-md font-thin mb-2">{subtitle}</p>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm opacity-75">{unit}</div>
  </div>
);
