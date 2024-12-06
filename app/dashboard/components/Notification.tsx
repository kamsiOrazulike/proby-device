import { useEffect, useState } from "react";
import { SensorReading } from "../../types";

interface Alert {
  message: string;
  type: "info" | "warning" | "error";
}

interface NotificationProps {
  data: SensorReading[];
}

const Notification = ({ data }: NotificationProps) => {
  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    if (!data.length) {
      setAlert({ message: "No readings detected", type: "info" });
      return;
    }

    const latestReading = data[0];

    if (latestReading.temperature && Number(latestReading.temperature) > 25) {
      setAlert({
        message: "Temperature is above optimal range",
        type: "warning",
      });
      return;
    }

    if (latestReading.humidity && Number(latestReading.humidity) > 60) {
      setAlert({ message: "Humidity levels are high", type: "warning" });
      return;
    }

    if (latestReading.voc_index && Number(latestReading.voc_index) > 200) {
      setAlert({ message: "High VOC levels detected", type: "error" });
      return;
    }

    if (
      latestReading.ph &&
      (Number(latestReading.ph) < 2 || Number(latestReading.ph) > 6)
    ) {
      setAlert({ message: "pH levels outside optimal range", type: "warning" });
      return;
    }

    setAlert(null);
  }, [data]);

  return (
    <div className="p-4">
      {!alert ? (
        <div className="text-green-500 bg-[#02F199]/10 p-3 rounded-lg">
          <p>All readings are within normal range</p>
        </div>
      ) : (
        <div
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
      )}
    </div>
  );
};

export default Notification;
