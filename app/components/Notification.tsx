"use client";
import { useEffect, useState } from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { NotificationProps, SensorReading, Alert } from "../types";
import SidePanel from "./SidePanel";
import ReadingCard from "./ReadingCard";
import ReadingChart from "./ReadingChart";

const Notification = ({
  data,
  isPaused,
  isConnected,
  onReconnect,
}: NotificationProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  useEffect(() => {
    if (!data.length) {
      setAlerts([
        {
          id: "no-data",
          message: "No readings detected",
          type: "info",
          sensorKey: "temperature",
          threshold: "N/A",
        },
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
        sensorKey: "temperature",
        threshold: "20°C",
      });
    }

    // Check humidity
    if (latestReading.humidity && Number(latestReading.humidity) > 60) {
      newAlerts.push({
        id: "humidity",
        message: "Humidity levels are high",
        type: "warning",
        sensorKey: "humidity",
        threshold: "60%",
      });
    }

    // Check VOC
    if (latestReading.voc_index && Number(latestReading.voc_index) > 200) {
      newAlerts.push({
        id: "voc",
        message: "High VOC levels detected",
        type: "error",
        sensorKey: "voc_index",
        threshold: "200",
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
        sensorKey: "ph",
        threshold: "2-5",
      });
    }

    setAlerts(newAlerts);
  }, [data]);

  const getReadingValue = (key: keyof SensorReading) => {
    if (!data.length) return "-";
    const value = data[0][key];
    if (typeof value === "number") {
      return key === "ph" ? value.toFixed(2) : value.toFixed(1);
    }
    return value?.toString() || "-";
  };

  const getSensorUnit = (key: keyof SensorReading) => {
    switch (key) {
      case "temperature":
        return "°C";
      case "humidity":
        return "%";
      case "pressure":
        return "hPa";
      default:
        return "";
    }
  };

  const getSensorTitle = (key: keyof SensorReading) => {
    switch (key) {
      case "temperature":
        return "Temperature";
      case "humidity":
        return "Humidity";
      case "voc_index":
        return "CO2 Levels";
      case "ph":
        return "pH Level";
      case "pressure":
        return "Pressure";
      default:
        return key;
    }
  };

  const getConnectionAlert = () => {
    if (isPaused) {
      return (
        <div className="bg-red-500/20 p-3 rounded-lg flex justify-between items-center">
          <span className="text-red-500">Device not found</span>
          <button
            onClick={onReconnect}
            className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
          >
            <AiOutlineWifi className="w-4 h-4" />
            Reconnect
          </button>
        </div>
      );
    }

    if (isConnected) {
      return (
        <div className="bg-green-500/20 p-3 rounded-lg">
          <span className="text-green-500 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Connected
          </span>
        </div>
      );
    }

    return (
      <div className="bg-yellow-500/20 p-3 rounded-lg">
        <span className="text-yellow-500 flex items-center gap-2">
          <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          Searching for device...
        </span>
      </div>
    );
  };

  return (
    <>
      <div className="p-4 space-y-2">
        {/* Connection Status Alert */}
        {getConnectionAlert()}

        {/* Sensor Alerts */}
        {alerts.length === 0 ? (
          <div className="text-green-500 bg-[#02F199]/10 p-3 rounded-lg">
            <p>All readings are within normal range</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg cursor-pointer ${
                alert.type === "error"
                  ? "bg-red-500/20 text-red-500"
                  : alert.type === "warning"
                  ? "bg-yellow-500/20 text-yellow-500"
                  : "bg-[#1a1a3e] text-blue-500"
              } flex justify-between items-center hover:opacity-90 transition-opacity`}
              onClick={() => {
                setSelectedAlert(alert);
                setSidePanelOpen(true);
              }}
            >
              <p>{alert.message}</p>
              <span className="text-sm">View details →</span>
            </div>
          ))
        )}
      </div>

      <SidePanel
        isOpen={sidePanelOpen}
        onClose={() => {
          setSidePanelOpen(false);
          setSelectedAlert(null);
        }}
      >
        {selectedAlert && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {getSensorTitle(selectedAlert.sensorKey)} Alert
              </h2>
              <p className="text-white/60 mb-6">{selectedAlert.message}</p>
            </div>

            <ReadingCard
              title={getSensorTitle(selectedAlert.sensorKey)}
              subtitle={`Threshold: ${selectedAlert.threshold}`}
              value={getReadingValue(selectedAlert.sensorKey)}
              unit={getSensorUnit(selectedAlert.sensorKey)}
              isLarge
            />

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Historical Data</h3>
              <div className="h-[300px]">
                <ReadingChart
                  data={data}
                  label={getSensorTitle(selectedAlert.sensorKey)}
                  dataKey={selectedAlert.sensorKey}
                />
              </div>
            </div>
          </div>
        )}
      </SidePanel>
    </>
  );
};

export default Notification;
