export interface SensorReading {
  id: number;
  microbial_activity: number;
  created_at: string;
}

export interface ReadingCardProps {
  title: string;
  value: string | number;
  unit: string;
}
