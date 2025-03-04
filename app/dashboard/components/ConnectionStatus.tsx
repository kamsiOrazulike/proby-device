import React from "react";
import { AiOutlineWifi } from "react-icons/ai";
import { MdSignalWifiStatusbarConnectedNoInternet } from "react-icons/md";

interface ConnectionStatusProps {
  isConnected: boolean;
  isPaused: boolean;
  onReconnect: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({
  isConnected,
  isPaused,
  onReconnect,
}) => {
  if (isPaused) {
    return (
      <button
        onClick={onReconnect}
        className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-100 transition-colors text-sm"
      >
        <MdSignalWifiStatusbarConnectedNoInternet className="w-4 h-4" />
        <span>Not connected to Device - Retry?</span>
      </button>
    );
  }

  if (isConnected) {
    return (
      <div className="bg-green-50 text-green-600 border border-green-200 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
        <AiOutlineWifi className="w-4 h-4" />
        <span>Connected</span>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 text-yellow-600 border border-yellow-200 px-4 py-2 rounded-full flex items-center gap-2 text-sm">
      <AiOutlineWifi className="w-4 h-4 animate-pulse" />
      <span>Connecting...</span>
    </div>
  );
};

export default ConnectionStatus;
