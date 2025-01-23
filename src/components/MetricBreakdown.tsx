import React from 'react';
import { Pie } from 'react-chartjs-2';
import { format } from 'date-fns';

interface MetricBreakdownProps {
  title: string;
  data: {
    labels: string[];
    datasets: any[];
  };
  total: number;
  values: number[];
  color: string;
}

export default function MetricBreakdown({ title, data, total, values, color }: MetricBreakdownProps) {
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, index: number) => ({
                text: `${label} (${((values[index] / total) * 100).toFixed(1)}%)`,
                fillStyle: data.datasets[0].backgroundColor[index],
                hidden: false,
                index: index
              }));
            }
            return [];
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: { size: 16, weight: 'bold' },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value.toLocaleString()} (${percentage}%)`;
          }
        }
      }
    },
  };

  const weeklyData = values.map((value, index) => ({
    week: format(new Date(data.labels[index]), 'MMM d'),
    value,
    percentage: (value / total) * 100
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <Pie options={pieOptions} data={data} />
        </div>
        <div className="w-full md:w-1/2">
          <h4 className="font-semibold mb-2">{title} by Week</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {weeklyData.map((week, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm">{week.week}</span>
                <div className="text-right">
                  <span className="font-medium" style={{ color }}>
                    {title.includes('Attendance') 
                      ? week.value.toLocaleString()
                      : `$${week.value.toLocaleString()}`}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({week.percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold">
                <span>Total</span>
                <span style={{ color }}>
                  {title.includes('Attendance')
                    ? total.toLocaleString()
                    : `$${total.toLocaleString()}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}