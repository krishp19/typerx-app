"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useUser } from "@clerk/nextjs";

// Import ApexCharts dynamically to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function SpeedChart({ sessionHistory }) {
  const { user } = useUser();
  const [chartData, setChartData] = useState({
    series: [
      { name: "WPM", data: [] },
      { name: "Accuracy", data: [] }
    ],
    options: {
      chart: { type: "line", background: "transparent" },
      xaxis: {
        categories: [],
        labels: { style: { colors: "#ffffff" } }
      },
      yaxis: { labels: { style: { colors: "#ffffff" } } },
      colors: ["#22c55e", "#facc15"], // Green for WPM, Yellow for Accuracy
      stroke: { curve: "smooth" },
      legend: { labels: { colors: "#ffffff" } },
      tooltip: { theme: "dark" }
    }
  });

  useEffect(() => {
    if (sessionHistory && Array.isArray(sessionHistory) && sessionHistory.length > 0) {
      setChartData((prev) => ({
        ...prev,
        series: [
          { name: "WPM", data: sessionHistory.map((session) => session.wpm) },
          { name: "Accuracy", data: sessionHistory.map((session) => session.accuracy) }
        ],
        options: {
          ...prev.options,
          xaxis: {
            categories: sessionHistory.map((session) =>
              new Date(session.date).toLocaleDateString()
            )
          }
        }
      }));
    }
  }, [sessionHistory]);

  return (
    <div className="bg-neutral-900 p-6 rounded-lg">
      {!user ? (
        <p className="text-neutral-400">Log in to see your progress chart.</p>
      ) : (
        <Chart options={chartData.options} series={chartData.series} type="line" height={300} />
      )}
    </div>
  );
}

export default SpeedChart;
