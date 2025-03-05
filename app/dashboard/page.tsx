/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { SensorReading } from "../types";
import { ConfirmModal } from "../components/Modal";
import PageLoader from "../components/PageLoader";

// Layout Components
import TabNavigation from "./components/TabNavigation";
import PageHeader from "./components/PageHeader";

// Section Components
import CurrentReadings from "./components/CurrentReadings";
import DeviceStatus from "./components/DeviceStatus";
import FermentationProgress from "./components/FermentationProgress";
import DeviceInfo from "./components/DeviceInfo";

// Client-only components
const DetailedAnalysis = dynamic(
  () => import("./components/DetailedAnalysis"),
  { ssr: false }
);

export default function Dashboard(): React.ReactNode {
  const [data, setData] = useState<SensorReading[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [expandedCharts, setExpandedCharts] = useState<Record<string, boolean>>(
    {}
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const lastReadingId = useRef<number | null>(null);
  const noChangeCount = useRef<number>(0);
  const uniqueIdsCount = useRef<Set<number>>(new Set<number>());
  const dashboardRef = useRef<HTMLDivElement | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState<boolean>(false);

  useEffect(() => {
    setAnimationsEnabled(true);
  }, []);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(loaderTimer);
  }, []);

  useEffect(() => {
    if (!isLoading && dashboardRef.current && animationsEnabled) {
      import("gsap")
        .then((gsapModule) => {
          const gsap = gsapModule.default;
          const ctx = gsap.context(() => {
            gsap.fromTo(
              ".dashboard-element",
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                stagger: 0.07,
                duration: 0.6,
                ease: "power2.out",
                clearProps: "transform",
              }
            );
          }, dashboardRef);

          return () => ctx.revert();
        })
        .catch((e) => {
          console.error("Failed to load GSAP:", e);
        });
    }
  }, [isLoading, activeTab, animationsEnabled]);

  // Data fetch
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const res = await fetch("/api/readings");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to fetch");
        }
        const readings: SensorReading[] = await res.json();

        if (readings[0]?.id === lastReadingId.current) {
          noChangeCount.current += 1;
          if (noChangeCount.current >= 5) {
            setIsPaused(true);
            setIsConnected(false);
            return;
          }
        } else {
          noChangeCount.current = 0;
          lastReadingId.current = readings[0]?.id;
          uniqueIdsCount.current.add(readings[0]?.id);
          if (uniqueIdsCount.current.size >= 3) {
            setIsConnected(true);
          }
          setData(readings);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
        setIsConnected(false);
      }
    };

    //Mock data
    const useMockData = () => {
      const mockData = [
        {
          id: Date.now(),
          temperature: 24.5,
          humidity: 65.2,
          pressure: 1013.2,
          voc_index: "3.2",
          ph: 3.5,
          created_at: new Date().toISOString(),
        },
      ];

      if (mockData[0]?.id === lastReadingId.current) {
        noChangeCount.current += 1;
        if (noChangeCount.current >= 5) {
          setIsPaused(true);
          setIsConnected(false);
          return;
        }
      } else {
        noChangeCount.current = 0;
        lastReadingId.current = mockData[0]?.id;
        uniqueIdsCount.current.add(mockData[0]?.id);
        if (uniqueIdsCount.current.size >= 3) {
          setIsConnected(true);
        }
        setData(mockData);
      }
    };

    if (!isPaused) {
      fetchData().catch(() => {
        console.log("Fetch failed, using mock data");
        useMockData();
      });

      const interval = setInterval(() => {
        fetchData().catch(() => useMockData());
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isPaused]);

  const handleReconnect = (): void => {
    setIsPaused(false);
    noChangeCount.current = 0;
    uniqueIdsCount.current.clear();
    setIsConnected(false);
  };

  const handleClearData = (): Promise<void> => {
    setData([]);
    return Promise.resolve();
  };

  const toggleChart = (key: string): void => {
    setExpandedCharts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <>
            <div className="dashboard-element mb-6">
              <h2 className="text-xl font-semibold mb-4">Current Readings</h2>
              <CurrentReadings data={data} onToggleChart={toggleChart} />
            </div>

            <div className="dashboard-element mb-6">
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <h3 className="font-semibold text-lg mb-3">
                      Device Status
                    </h3>
                    <DeviceStatus
                      isConnected={isConnected}
                      isPaused={isPaused}
                      onReconnect={handleReconnect}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-lg mb-3">
                      Fermentation Progress
                    </h3>
                    <FermentationProgress />
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "analysis":
        return (
          <div className="dashboard-element">
            <h2 className="text-xl font-semibold mb-4">
              Detailed Sensor Analysis
            </h2>
            <DetailedAnalysis
              data={data}
              expandedCharts={expandedCharts}
              toggleChart={toggleChart}
            />
          </div>
        );

      case "device":
        return (
          <div className="dashboard-element">
            <h2 className="text-xl font-semibold mb-4">Device Management</h2>
            <DeviceInfo />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Page Loader */}
      <PageLoader isLoading={isLoading} onLoadingComplete={() => {}} />

      {/* Dashboard Content */}
      <div
        className={`bg-gray-50 text-black min-h-screen transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        ref={dashboardRef}
      >
        {/* Tab Navigation */}
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <main className="w-full px-4 py-6 md:max-w-7xl md:mx-auto md:px-6 md:py-8">
          {/* Tab Content */}
          {renderTabContent()}

          {/* Error Display */}
          {error && (
            <div className="dashboard-element mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p>Error: {error}</p>
            </div>
          )}
        </main>
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleClearData}
        title="Clear Historical Data"
        message="Are you sure you want to clear all historical data? This action cannot be undone."
      />
    </>
  );
}
