import { useEffect, useState } from "react";
import { SensorReading } from "../../types";

interface Alert {
  id: string;
  message: string;
  type: "info" | "warning" | "error";
}

interface NotificationProps {
  data: SensorReading[];
}

const Notification = ({ data }: NotificationProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    if (!data.length) {
      setAlerts([
        { id: "no-data", message: "No readings detected", type: "info" },
      ]);
      return;
    }

    const latestReading = data[0];
    const newAlerts: Alert[] = [];

    // Check temperature
    if (latestReading.temperature && Number(latestReading.temperature) > 20) {
      newAlerts.push({
        id: "temperature",
        message: "Temperature is above optimal range",
        type: "warning",
      });
    }

    // Check humidity
    if (latestReading.humidity && Number(latestReading.humidity) > 60) {
      newAlerts.push({
        id: "humidity",
        message: "Humidity levels are high",
        type: "warning",
      });
    }

    // Check VOC
    if (latestReading.voc_index && Number(latestReading.voc_index) > 200) {
      newAlerts.push({
        id: "voc",
        message: "High VOC levels detected",
        type: "error",
      });
    }

    // Check pH
    if (
      latestReading.ph &&
      (Number(latestReading.ph) < 2 || Number(latestReading.ph) > 5)
    ) {
      newAlerts.push({
        id: "ph",
        message: "pH levels outside optimal range",
        type: "warning",
      });
    }

    setAlerts(newAlerts);
  }, [data]);

  return (
    <div className="p-4 space-y-2">
      {alerts.length === 0 ? (
        <div className="text-green-500 bg-[#02F199]/10 p-3 rounded-lg">
          <p>All readings are within normal range</p>
        </div>
      ) : (
        alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-3 rounded-lg ${
              alert.type === "error"
                ? "bg-red-500/20 text-red-500"
                : alert.type === "warning"
                ? "bg-yellow-500/20 text-yellow-500"
                : "bg-[#1a1a3e] text-blue-500"
            }`}
          >
            <p>{alert.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
