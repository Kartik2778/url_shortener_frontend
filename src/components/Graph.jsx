import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  Legend
);

const Graph = ({ myUrlList }) => {
  const labels = myUrlList?.map((item) => `${item.clickDate}`);
  const userPerDay = myUrlList?.map((item) => item.count);

  const data = {
    labels:
      myUrlList.length > 0
        ? labels
        : ['', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Total Clicks',
        data:
          myUrlList.length > 0
            ? userPerDay
            : [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1],
        backgroundColor: myUrlList.length > 0 ? '#3b82f6' : 'rgba(54,162,235, 0.1)',
        borderColor: '#1D2327',
        pointBorderColor: 'red',
        fill: true,
        tension: 0.4,
        barThickness: 20,
        categoryPercentage: 1.5,
        barPercentage: 1.5,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value.toString();
            }
            return '';
          },
        },
        title: {
          display: true,
          text: 'Number of Clicks',
          color: '#FF0000',
          font: {
            family: 'Arial',
            size: 16,
            weight: 'bold',
          },
        },
      },
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Date',
          color: '#FF0000',
          font: {
            family: 'Arial',
            size: 16,
            weight: 'bold',
          },
        },
      },
    },
  };

  return <Bar className="w-full" data={data} options={options} />;
};

export default Graph;
