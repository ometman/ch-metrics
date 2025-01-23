import React from 'react';
import { Line } from 'react-chartjs-2';
import MonthlyMetricBreakdown from './MonthlyMetricBreakdown';

interface MetricYearViewProps {
  title: string;
  monthlyData: {
    [month: string]: {
      labels: string[];
      datasets: any[];
      values: number[];
      total: number;
    };
  };
  trendData: {
    labels: string[];
    datasets: any[];
  };
  color: string;
}

export default function MetricYearView({ title, monthlyData, trendData, color }: MetricYearViewProps) {
  const trendOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${title} - Yearly Trend`,
        font: { size: 16, weight: 'bold' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      
      <div className="mb-6">
        <Line options={trendOptions} data={trendData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(monthlyData).map(([month, data]) => (
          <MonthlyMetricBreakdown
            key={month}
            month={month}
            data={data}
            total={data.total}
            values={data.values}
            color={color}
          />
        ))}
      </div>
    </div>
  );
}