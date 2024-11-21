export interface SensorReading {
  id: number;
  microbial_activity: number;
  temperature: number;
  humidity: number;
  created_at: string;
}

export interface ReadingCardProps {
  title: string;
  subtitle?: string;
  value: string | number;
  unit: string;
}
