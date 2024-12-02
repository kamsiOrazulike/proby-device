export interface SensorReading {
  id: number;
  created_at: string;
  microbial_activity: number;
  temperature: number;
  humidity: number;
  cloud_index: number;
}

export interface ReadingCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  unit: string;
  isLarge?: boolean;
  onViewChart?: () => void;
}

export interface ChartProps {
  data: SensorReading[];
  label: string;
  dataKey: keyof SensorReading;
}

export interface TeamMemberProps {
  name: string;
  title: string;
  description: string;
  hobbies?: string;
  email: string;
  linkedin?: string;
  imageUrl?: string;
}
