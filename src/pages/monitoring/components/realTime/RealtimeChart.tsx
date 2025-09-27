// RealtimeChart.tsx
import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";
import { realTimeChartCsv } from "../../../../constants/constansValues";

Chart.register(
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip
);

const RealtimeChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const fetchData = async () => {
    const response = await fetch(realTimeChartCsv);
    const text = await response.text();
    return text.split("\n").map((line) => line.split(","));
  };

  const updateChart = (data: string[][]) => {
    if (!data || data.length === 0 || !chartInstance.current) return;

    const trimmed = data.length > 20 ? data.slice(-20) : data;
    const timestamps = trimmed.map(() => "*"); // Placeholder
    const prices = trimmed.map((entry) => parseFloat(entry[1]));
    chartInstance.current.data.labels = timestamps;
    chartInstance.current.data.datasets[0].data = prices;
    chartInstance.current.update();
  };

  useEffect(() => {
    const setupChart = async () => {
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      const data = await fetchData();

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Price",
              borderColor: "rgba(255, 1, 1, 1)",
              data: [],
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true, // ✅ Show clickable dataset labels
              position: "top", // Optional: 'top' | 'bottom' | 'left' | 'right'
            },
          },
        },
      });

      updateChart(data);

      const intervalId = setInterval(async () => {
        const newData = await fetchData();
        updateChart(newData);
      }, 2000);

      return () => clearInterval(intervalId); // Cleanup on unmount
    };

    setupChart();
  }, []);

  return (
    <div className="h-72 bg-secondary p-4 rounded-lg">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default RealtimeChart;
