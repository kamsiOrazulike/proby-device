"use client";
import { useEffect, useState } from "react";
import {
  AiOutlineHistory,
  AiOutlineDelete,
  AiOutlineWifi,
} from "react-icons/ai";
import ReadingCard, { getThresholds, isOutsideThreshold } from "./ReadingCard";
import { NotificationProps, SensorReading, Alert } from "../types";
import SidePanel from "./SidePanel";
import ReadingChart from "./ReadingChart";
import { ConfirmModal } from "./Modal";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

const Notification = ({
  data,
  isPaused,
  isConnected,
  onReconnect,
  onClearData,
}: NotificationProps) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDataHistory, setShowDataHistory] = useState(false);
  const [expandedCharts, setExpandedCharts] = useState<Record<string, boolean>>(
    {}
  );

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
    if (latestReading.temperature && Number(latestReading.temperature) > 28) {
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
      case "voc_index":
        return "ppm";
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
        <div className="bg-red-500/20 p-3 mr-2 rounded-lg flex justify-between items-center">
          <button
            onClick={onReconnect}
            className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center gap-2"
          >
            <MdSignalWifiStatusbarConnectedNoInternet className="w-4" />
          </button>
        </div>
      );
    }

    if (isConnected) {
      return (
        <div className="bg-green-500/20 p-3 mr-2 rounded-lg flex justify-between items-center">
          <span className="text-green-500 flex items-center animate-pulse gap-2">
            <AiOutlineWifi className="w-4" />
          </span>
        </div>
      );
    }

    return (
      <div className="bg-yellow-500/20 p-3 mr-2 rounded-lg flex justify-between items-center">
        <span className="text-yellow-500 flex items-center animate-pulse gap-2">
          <AiOutlineWifi className="w-4 animate-pulse" />
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

  const toggleChart = (key: string) => {
    setExpandedCharts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleClearData = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmClear = async () => {
    await onClearData();
    setShowConfirmModal(false);
  };

  const closeSidePanel = () => {
    setSidePanelOpen(false);
    setSelectedAlert(null);
    setShowDataHistory(false);
    setExpandedCharts({});
  };

  const handleShowDataHistory = () => {
    setShowDataHistory(true);
    setSidePanelOpen(true);
    setSelectedAlert(null);
  };

  return (
    <>
      <div className="p-4 space-y-2">
        {/* Control Actions */}
        <div className="mb-8">
          <div className="flex flex-row w-full mb-2">
            {/* Connection Status Alert */}
            {getConnectionAlert()}
            <div
              className="w-full mr-1 bg-white/50 p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity flex justify-between items-center"
              onClick={handleShowDataHistory}
            >
              <div className="flex items-center gap-2 text-black">
                <AiOutlineHistory className="w-4 h-4" />
                <span>All Data </span>
              </div>
              <span className="text-sm text-black">→</span>
            </div>

            <div
              className="w-auto ml-1 bg-red-500/20 p-3 rounded-lg cursor-pointer hover:opacity-90 transition-opacity flex justify-between items-center"
              onClick={handleClearData}
            >
              <div className="flex items-center gap-2 text-red-500">
                <AiOutlineDelete className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Sensor Alerts */}
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
                setShowDataHistory(false);
                setSidePanelOpen(true);
              }}
            >
              <p>{alert.message}</p>
              <span className="text-sm">View →</span>
            </div>
          ))
        )}
      </div>

      <SidePanel isOpen={sidePanelOpen} onClose={closeSidePanel}>
        {selectedAlert ? (
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

            <div className="space-y-4">
              <ReadingCard
                title={getSensorTitle(selectedAlert.sensorKey)}
                subtitle={`Threshold: ${selectedAlert.threshold}`}
                value={getReadingValue(selectedAlert.sensorKey)}
                unit={getSensorUnit(selectedAlert.sensorKey)}
                isLarge
                showChart={expandedCharts[selectedAlert.sensorKey]}
                onToggleChart={() => toggleChart(selectedAlert.sensorKey)}
              >
                {expandedCharts[selectedAlert.sensorKey] && (
                  <ReadingChart
                    data={data}
                    label={getSensorTitle(selectedAlert.sensorKey)}
                    dataKey={selectedAlert.sensorKey}
                  />
                )}
              </ReadingCard>
            </div>
          </div>
        ) : showDataHistory ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">All Sensor Data</h2>
            </div>
            <div className="space-y-4">
              {[...Object.keys(data[0] || {})] // Create a new array to avoid mutating the original
                .filter((key) => key !== "id" && key !== "created_at")
                .map((key) => {
                  const value = Number(
                    getReadingValue(key as keyof SensorReading)
                  );
                  const title = getSensorTitle(key as keyof SensorReading);
                  const thresholds = getThresholds(title);
                  const isWarning = isOutsideThreshold(value, thresholds);

                  return {
                    key,
                    value,
                    title,
                    isWarning,
                  };
                })
                .sort((a, b) => {
                  // Put warnings at the top
                  if (a.isWarning && !b.isWarning) return -1;
                  if (!a.isWarning && b.isWarning) return 1;
                  return 0;
                })
                .map(({ key }) => (
                  <div key={key} className="space-y-2">
                    <ReadingCard
                      title={getSensorTitle(key as keyof SensorReading)}
                      subtitle="Current Reading"
                      value={getReadingValue(key as keyof SensorReading)}
                      unit={getSensorUnit(key as keyof SensorReading)}
                      showChart={expandedCharts[key]}
                      onToggleChart={() => toggleChart(key)}
                    >
                      {expandedCharts[key] && (
                        <ReadingChart
                          data={data}
                          label={getSensorTitle(key as keyof SensorReading)}
                          dataKey={key as keyof SensorReading}
                        />
                      )}
                    </ReadingCard>
                  </div>
                ))}
            </div>
          </div>
        ) : null}
      </SidePanel>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmClear}
        title="Clear Historical Data"
        message="Are you sure you want to clear all historical data? This action cannot be undone."
      />
    </>
  );
};

export default Notification;
