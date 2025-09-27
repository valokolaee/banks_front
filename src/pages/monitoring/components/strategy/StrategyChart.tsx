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
import { strategyChartCsv } from "../../../../constants/constansValues";
 
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
const StrategyChart: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const fetchData = async () => {
    const response = await fetch(strategyChartCsv);
    const text = await response.text();
    return text.split("\n").map((line) => line.split(","));
  };

  const updateChart = (data: string[][]) => {
    if (!data || data.length === 0 || !chartInstance.current) return;

    const sliced = data.length > 20 ? data.slice(-20) : data;

    const timestamps = sliced.map((entry) => entry[0]);
    const prices = sliced.map((entry) => parseFloat(entry[1]));
    const channelZp = sliced.map((entry) => parseFloat(entry[2]));
    const channelChp = sliced.map((entry) => parseFloat(entry[3]));

    const chart = chartInstance.current;
    chart.data.labels = timestamps;
    chart.data.datasets[0].data = prices;
    chart.data.datasets[1].data = channelZp;
    chart.data.datasets[2].data = channelChp;
    chart.update();
  };

  useEffect(() => {
    const createChart = async () => {
      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      const initialData = await fetchData();

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Price",
              borderColor: "rgba(255, 99, 132, 1)",
              data: [],
              fill: false,
            },
            {
              label: "Channel Zp",
              borderColor: "rgba(54, 162, 235, 1)",
              data: [],
              fill: false,
            },
            {
              label: "Channel Chp",
              borderColor: "rgba(255, 206, 86, 1)",
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

      updateChart(initialData);

      const intervalId = setInterval(async () => {
        const newData = await fetchData();
        updateChart(newData);
      }, 5000);

      return () => clearInterval(intervalId);
    };

    createChart();
  }, []);

  return (
    <div className="  ">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default StrategyChart;
