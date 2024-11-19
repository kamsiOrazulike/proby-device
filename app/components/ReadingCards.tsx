import { ReadingCardProps } from "../types";

export const ReadingCard = ({ title, value, unit }: ReadingCardProps) => (
  <div className="bg-yellow-300 p-6 rounded-lg shadow-lg">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-sm opacity-75">{unit}</div>
  </div>
);
