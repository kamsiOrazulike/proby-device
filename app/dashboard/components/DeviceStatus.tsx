import React from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

interface DeviceStatusProps {
  isConnected: boolean;
  isPaused: boolean;
  onReconnect: () => void;
}

const DeviceStatus: React.FC<DeviceStatusProps> = ({
  isConnected,
  isPaused,
  onReconnect,
}) => {
  return (
    <div className="space-y-4">
      <div
        className="rounded-lg bg-contain bg-center bg-no-repeat h-32 md:h-40 w-full"
        style={{
          backgroundImage: "url('/static/imgs/hero-no-bg-2.svg')",
        }}
      />

      {isPaused ? (
        <button
          onClick={onReconnect}
          className="w-full py-2 px-3 rounded-full flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-200 text-sm"
        >
          <MdSignalWifiStatusbarConnectedNoInternet className="w-4 h-4" />
          <span>Not connected - Retry?</span>
        </button>
      ) : isConnected ? (
        <div className="w-full py-2 px-3 rounded-full flex items-center justify-center gap-2 bg-green-50 text-green-600 border border-green-200 text-sm">
          <AiOutlineWifi className="w-4 h-4" />
          <span>Connected</span>
        </div>
      ) : (
        <div className="w-full py-2 px-3 rounded-full flex items-center justify-center gap-2 bg-yellow-50 text-yellow-600 border border-yellow-200 text-sm">
          <AiOutlineWifi className="w-4 h-4 animate-pulse" />
          <span>Connecting...</span>
        </div>
      )}
    </div>
  );
};

export default DeviceStatus;
