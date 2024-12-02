export interface SensorReading {
  id: number;
  microbial_activity: number;
  temperature: number;
  humidity: number;
  cloud_index: number;
  created_at: string;
}

export type ChartProps = {
  data: SensorReading[];
  label: string;
  dataKey: keyof SensorReading;
  color: string;
};

export interface ReadingCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  unit: string;
  isLarge?: boolean;
};

export interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  hobbies?: string;
  email: string;
  linkedin?: string;
  imageUrl?: string;
}
