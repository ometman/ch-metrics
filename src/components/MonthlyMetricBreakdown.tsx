import React from 'react';
import { Pie } from 'react-chartjs-2';

interface MonthlyMetricBreakdownProps {
  month: string;
  data: {
    labels: string[];
    datasets: any[];
  };
  total: number;
  values: number[];
  color: string;
}

export default function MonthlyMetricBreakdown({ month, data, total, values, color }: MonthlyMetricBreakdownProps) {
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: month,
        font: { size: 14, weight: 'bold' },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        <div className="w-full">
          <Pie options={pieOptions} data={data} />
        </div>
        <div className="w-full">
          <div className="space-y-1">
            {data.labels.map((label, index) => (
              <div key={label} className="flex justify-between items-center text-sm">
                <span>{label}</span>
                <div className="text-right">
                  <span className="font-medium" style={{ color }}>
                    {values[index].toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({((values[index] / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t pt-1 mt-1">
              <div className="flex justify-between items-center font-bold text-sm">
                <span>Total</span>
                <span style={{ color }}>{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}