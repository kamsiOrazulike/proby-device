import React from "react";

interface PageHeaderProps {
  activeTab: string;
  lastUpdated?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ activeTab, lastUpdated }) => {
  return (
    <div className="dashboard-element mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-2 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-900">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "analysis" && "Sensor Analysis"}
            {activeTab === "device" && "Device Management"}
          </h1>
          <p className="text-gray-500 mt-1">
            {activeTab === "overview" &&
              "Monitor your fermentation process in real-time"}
            {activeTab === "analysis" &&
              "Detailed sensor readings and historical data"}
            {activeTab === "device" &&
              "Manage your Proby device settings and information"}
          </p>
        </div>

        <div className="text-sm text-gray-500">
          {activeTab === "overview" && lastUpdated && (
            <div>
              Last updated:
              <br />
              <span className="font-medium">{lastUpdated}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
