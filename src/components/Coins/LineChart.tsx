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
  Filler, // Import Filler for the gradient fill
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Register the Filler plugin for the gradient
);

interface LineChartProps {
  dataPoints: number[]; // An array of price points
}

const LineChart: React.FC<LineChartProps> = ({ dataPoints }) => {
  const chartRef = React.useRef(null); // Create a ref to access the chart instance

  const data = {
    labels: dataPoints.map((_, index) => index), // Use index as the label
    datasets: [
      {
        label: 'Price Movement',
        data: dataPoints,
        borderColor: 'rgba(56, 193, 114, 1)', // Green for the line
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          // Create a gradient fill for the area under the curve
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, 'rgba(56, 193, 114, 0.5)'); // Stronger green at the top
          gradient.addColorStop(1, 'rgba(56, 193, 114, 0)'); // Fading to transparent at the bottom

          return gradient;
        },
        fill: true, // Fill the area under the line
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

  return <Line ref={chartRef} data={data} options={options} height={50} />;
};

export default LineChart;
