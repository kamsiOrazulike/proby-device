export interface SensorReading {
  id?: number;
  temperature: number;
  humidity: number;
  pressure: number;
  timestamp?: string;
}

export interface ReadingCardProps {
  title: string;
  value: string | number;
  unit: string;
}
