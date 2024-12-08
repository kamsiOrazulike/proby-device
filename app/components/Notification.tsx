"use client";
import { useEffect, useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineWifi,
} from "react-icons/ai";
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
  const [showChart, setShowChart] = useState(false);

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
    if (latestReading.temperature && Number(latestReading.temperature) > 25) {
      newAlerts.push({
        id: "temperature",
        message: "Temperature is above optimal range",
        type: "warning",
        sensorKey: "temperature",
        threshold: "25°C",
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
      (Number(latestReading.ph) < 6 || Number(latestReading.ph) > 7)
    ) {
      newAlerts.push({
        id: "ph",
        message: "pH levels outside optimal range",
        type: "warning",
        sensorKey: "ph",
        threshold: "4-7",
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

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/20 text-red-500";
      case "warning":
        return "bg-yellow-500/20 text-yellow-500";
      default:
        return "bg-[#1a1a3e] text-blue-500";
    }
  };

  return (
    <>
      <div className="p-4 space-y-2">
        {/* Keep your existing alerts code */}
        {getConnectionAlert()}

        {alerts.length === 0 ? (
          <div className="text-green-500 bg-[#02F199]/10 p-3 rounded-lg">
            <p>All readings are within normal range</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-3 rounded-lg cursor-pointer ${getAlertStyles(
                alert.type
              )} flex justify-between items-center hover:opacity-90 transition-opacity`}
              onClick={() => {
                setSelectedAlert(alert);
                setSidePanelOpen(true);
                setShowChart(false); // Reset chart visibility when opening new alert
              }}
            >
              <p>{alert.message}</p>
              <span className="text-sm">View →</span>
            </div>
          ))
        )}
      </div>

      <SidePanel
        isOpen={sidePanelOpen}
        onClose={() => {
          setSidePanelOpen(false);
          setSelectedAlert(null);
          setShowChart(false);
        }}
      >
        {selectedAlert && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {getSensorTitle(selectedAlert.sensorKey)}
              </h2>
              <div
                className={`p-3 rounded-lg ${getAlertStyles(
                  selectedAlert.type
                )}`}
              >
                <p>{selectedAlert.message}</p>
              </div>
            </div>

            <div className="relative">
              <ReadingCard
                title={getSensorTitle(selectedAlert.sensorKey)}
                subtitle={`Threshold: ${selectedAlert.threshold}`}
                value={getReadingValue(selectedAlert.sensorKey)}
                unit={getSensorUnit(selectedAlert.sensorKey)}
                isLarge
              />
              <button
                onClick={() => setShowChart(!showChart)}
                className="absolute bottom-4 right-4 p-2 text-white/60 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                {showChart ? (
                  <>
                    Close History
                    <AiOutlineArrowUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    View History
                    <AiOutlineArrowDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {showChart && (
              <div className="mt-4 space-y-4 animate-fadeIn ">
                <h3 className="text-lg font-semibold">Historical Data</h3>
                <div className="h-[300px]">
                  <ReadingChart
                    data={data}
                    label={getSensorTitle(selectedAlert.sensorKey)}
                    dataKey={selectedAlert.sensorKey}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </SidePanel>
    </>
  );
};

export default Notification;
