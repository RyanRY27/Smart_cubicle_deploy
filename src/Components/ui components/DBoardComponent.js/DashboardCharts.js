import React from "react";
import { Bar, Line } from "react-chartjs-2";

// Import chart data and options
import {
  resourcesChartData,
  trendsChartData,
  usageData,
  chartOptions,
  resourcesChartOptions,
  trendsChartOptions,
} from "../../../data/ChartData"; 

// Resources Usage Chart Component
export const ResourcesUsageChart = ({ chartType, setShowChartDropdown, showChartDropdown, setChartType }) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Resources Usage</h2>
        <div className="relative">
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setShowChartDropdown(!showChartDropdown)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          {showChartDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setChartType("line");
                    setShowChartDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Line Chart
                </button>
                <button
                  onClick={() => {
                    setChartType("bar");
                    setShowChartDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Bar Chart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Chart Section */}
      <div className="w-full h-full flex-grow overflow-hidden">
        {chartType === "bar" ? (
          <Bar
            data={resourcesChartData(chartType)} 
            options={{
              ...resourcesChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <Line
            data={resourcesChartData(chartType)} 
            options={{
              ...resourcesChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

// Trends Over Time Chart Component
export const TrendsOverTimeChart = ({ trendsChartType, setShowTrendsDropdown, showTrendsDropdown, setTrendsChartType }) => {
  return (
    <div className="flex flex-col space-y-4 h-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trends Over Time</h2>
        <div className="relative">
          <button
            className="p-1 hover:bg-gray-100 rounded-full"
            onClick={() => setShowTrendsDropdown(!showTrendsDropdown)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              />
            </svg>
          </button>
          {showTrendsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                <button
                  onClick={() => {
                    setTrendsChartType("line");
                    setShowTrendsDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Line Chart
                </button>
                <button
                  onClick={() => {
                    setTrendsChartType("bar");
                    setShowTrendsDropdown(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Bar Chart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Chart Section */}
      <div className="w-full h-full flex-grow overflow-hidden">
        {trendsChartType === "bar" ? (
          <Bar
            data={trendsChartData(trendsChartType)} 
            options={{
              ...trendsChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        ) : (
          <Line
            data={trendsChartData(trendsChartType)}
            options={{
              ...trendsChartOptions,
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        )}
      </div>
    </div>
  );
};

// Usage Monitoring Chart Component
export const UsageMonitoringChart = () => {
  return (
    <div className="flex flex-col mb-4 h-full">
      <h2 className="text-xl font-bold mb-5">Usage Monitoring</h2>
      <div className="flex-grow">
        <Line
          data={usageData} 
          options={{
            ...chartOptions,
            responsive: true,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};