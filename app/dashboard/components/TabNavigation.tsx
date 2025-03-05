import React, { useRef, useEffect } from "react";
import { AiOutlineDashboard, AiOutlineAreaChart } from "react-icons/ai";
import { MdOutlineDevices } from "react-icons/md";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector(
        '[aria-current="page"]'
      );
      if (activeButton) {
        const container = tabsRef.current;
        const buttonRect = activeButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const scrollLeft =
          activeButton.getBoundingClientRect().left +
          container.scrollLeft -
          containerRect.left -
          (containerRect.width - buttonRect.width) / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [activeTab]);

  return (
    <div className="pt-32 md:pt-28 pb-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-sm text-gray-500 px-4 mb-2">
          Swipe to see more options
        </div>

        {/* Tabs Container */}
        <div
          ref={tabsRef}
          className="flex space-x-4 px-4 overflow-x-auto 
                    scrollbar-hide scroll-smooth touch-pan-x"
        >
          <button
            onClick={() => onTabChange("overview")}
            className={`flex items-center gap-2 py-3 px-5 rounded-lg whitespace-nowrap
                      ${
                        activeTab === "overview"
                          ? "bg-white shadow-sm text-black font-medium"
                          : "bg-transparent text-gray-500"
                      }`}
            aria-current={activeTab === "overview" ? "page" : undefined}
          >
            <AiOutlineDashboard className="text-xl" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onTabChange("analysis")}
            className={`flex items-center gap-2 py-3 px-5 rounded-lg whitespace-nowrap
                      ${
                        activeTab === "analysis"
                          ? "bg-white shadow-sm text-black font-medium"
                          : "bg-transparent text-gray-500"
                      }`}
            aria-current={activeTab === "analysis" ? "page" : undefined}
          >
            <AiOutlineAreaChart className="text-xl" />
            <span>Sensor Analysis</span>
          </button>

          <button
            onClick={() => onTabChange("device")}
            className={`flex items-center gap-2 py-3 px-5 rounded-lg whitespace-nowrap
                      ${
                        activeTab === "device"
                          ? "bg-white shadow-sm text-black font-medium"
                          : "bg-transparent text-gray-500"
                      }`}
            aria-current={activeTab === "device" ? "page" : undefined}
          >
            <MdOutlineDevices className="text-xl" />
            <span>Device Management</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
