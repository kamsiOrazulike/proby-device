import React from "react";

const FermentationProgress: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h4 className="font-medium">Kombucha Batch #4</h4>
        <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
          57% Complete
        </span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-blue-500 h-full rounded-full"
          style={{ width: "57%" }}
        ></div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-2">
        <span>Started: Mar 01</span>
        <span>Est. Completion: Mar 07</span>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-sm text-blue-800">
        <p className="font-medium mb-1">Status: On Track</p>
        <p className="text-xs md:text-sm">
          Your fermentation is progressing well with optimal pH and CO₂ levels.
        </p>
      </div>
    </div>
  );
};

export default FermentationProgress;
