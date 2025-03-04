import React from "react";

const DeviceInfo: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Device Information */}
      <div className="lg:col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-gray-900">
            Device Information
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <div
            className="w-full h-[200px] rounded-lg bg-contain bg-center bg-no-repeat mx-auto"
            style={{
              backgroundImage: "url('/static/imgs/hero-no-bg-2.svg')",
            }}
          />

          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Device ID</span>
              <span className="font-medium">PROBY-1001</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Firmware</span>
              <span className="font-medium">v1.2.4</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Last Update</span>
              <span className="font-medium">3 days ago</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Battery</span>
              <span className="font-medium text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center pb-2">
              <span className="text-gray-500 text-sm">Status</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fermentation Process */}
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-gray-900">
            Current Fermentation
          </h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-lg">Kombucha Batch #4</h4>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              Day 4 of 7
            </span>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full"
              style={{ width: "57%" }}
            ></div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Started</p>
              <p className="font-medium">Mar 01, 2025</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Est. Completion</p>
              <p className="font-medium">Mar 07, 2025</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Health</p>
              <p className="font-medium text-green-600">Excellent</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h5 className="font-medium mb-2">Fermentation Notes</h5>
            <p className="text-sm text-gray-600">
              SCOBY is healthy and developing well. pH level is dropping as
              expected, indicating active fermentation. Kombucha has a pleasant
              tangy smell with no signs of mold or contamination.
            </p>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
              View History
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Edit Batch
            </button>
          </div>
        </div>
      </div>

      {/* Device Settings Card */}
      <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-lg text-gray-900">
            Device Settings
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">
                Measurement Frequency
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current: 5 min</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Change
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">
                Temperature Units
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current: Celsius</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Change
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">
                Update Firmware
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Current: v1.2.4</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Check for Updates
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">Alerts</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status: Enabled</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Configure
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">Data Retention</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Status: 30 days</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Change
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-3">Device Name</h4>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Name: Proby Kitchen</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">
                  Rename
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button className="px-6 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;
