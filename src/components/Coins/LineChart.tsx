import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@fluentui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  dataPoints: number[];
}

const LineChart: React.FC<LineChartProps> = ({ dataPoints }) => {
  const chartRef = React.useRef(null);
  const theme = useTheme(); 

  const data = {
    labels: dataPoints.map((_, index) => index),
    datasets: [
      {
        label: 'Price Movement',
        data: dataPoints,
        borderColor: theme.palette.themePrimary,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return null;
          }

          // Create a gradient fill for the area under the curve
          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, `${theme.palette.themePrimary}88`);
          gradient.addColorStop(1, `${theme.palette.themePrimary}00`);

          return gradient;
        },
        fill: true, // Fill the area under the line
        tension: 0.4, // Curved line
        borderWidth: 1,
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
