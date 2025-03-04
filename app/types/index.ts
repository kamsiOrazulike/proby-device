export interface SensorReading {
  id: number;
  created_at: string;
  ph: number;
  temperature: number;
  humidity: number;
  pressure: number;
  voc_index: string;
}

export interface Alert {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
  sensorKey: keyof SensorReading;
  threshold: string;
}

export interface NotificationProps {
  data: SensorReading[];
  isPaused: boolean;
  isConnected: boolean;
  onReconnect: () => void;
  onClearData: () => void;
}

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export interface ReadingCardProps {
  title: string;
  subtitle: string;
  value: string | number;
  unit: string;
  isLarge?: boolean;
  showChart?: boolean;
  onToggleChart?: () => void;
  children?: React.ReactNode;
}

export interface ChartProps {
  data: SensorReading[];
  label: string;
  dataKey: keyof SensorReading;
}

export interface TeamMemberProps {
  name: string;
  title: string;
  hobbies?: string;
  email: string;
  linkedin?: string;
  imageUrl?: string;
}
