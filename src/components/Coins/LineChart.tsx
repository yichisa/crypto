import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  dataPoints: number[]; // An array of price points
}

const LineChart: React.FC<LineChartProps> = ({ dataPoints }) => {
  const data = {
    labels: dataPoints.map((_, index) => index), // Just using index as label
    datasets: [
      {
        label: 'Price Movement',
        data: dataPoints,
        borderColor: 'rgba(56, 193, 114, 1)', // Green for the line
        backgroundColor: 'rgba(56, 193, 114, 0.1)', // Light green background
        tension: 0.4, // Curved line
        borderWidth: 2,
        pointRadius: 0, // No visible points
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Makes it responsive
    scales: {
      x: {
        display: false, // Hide x-axis labels
      },
      y: {
        display: false, // Hide y-axis labels
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: false, // Disable tooltips
      },
    },
  };

  return <Line data={data} options={options} height={50} />;
};

export default LineChart;
