import { useState, useEffect } from 'react';
import { ChurchMetrics } from '../types/metrics';
import { format, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear } from 'date-fns';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import MetricBreakdown from './MetricBreakdown';
import SundayMetricsTable from './SundayMetricsTable';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

type MetricType = 'attendance' | 'donations' | 'offering' | 'tithes' | 'projectOffering';
type PeriodType = 'monthly' | 'quarterly' | 'yearly';

interface MetricData {
  labels: string[];
  datasets: any[];
  values: number[];
  total: number;
}

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('monthly');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [periodMetrics, setPeriodMetrics] = useState<ChurchMetrics[]>([]);
  const [metricsData, setMetricsData] = useState<Record<MetricType, MetricData | null>>({
    attendance: null,
    donations: null,
    offering: null,
    tithes: null,
    projectOffering: null,
  });

  const metricColors = {
    attendance: 'rgb(75, 192, 192)',
    donations: 'rgb(255, 99, 132)',
    offering: 'rgb(53, 162, 235)',
    tithes: 'rgb(255, 159, 64)',
    projectOffering: 'rgb(153, 102, 255)',
  };

  const metricTitles = {
    attendance: 'Attendance',
    donations: 'Donations',
    offering: 'Offering',
    tithes: 'Tithes',
    projectOffering: 'Project Offering',
  };

  const calculateMetrics = () => {
    const metrics: ChurchMetrics[] = JSON.parse(localStorage.getItem('churchMetrics') || '[]');
    let startDate: Date, endDate: Date;

    switch (selectedPeriod) {
      case 'monthly':
        startDate = startOfMonth(selectedDate);
        endDate = endOfMonth(selectedDate);
        break;
      case 'quarterly':
        startDate = startOfQuarter(selectedDate);
        endDate = endOfQuarter(selectedDate);
        break;
      case 'yearly':
        startDate = startOfYear(selectedDate);
        endDate = endOfYear(selectedDate);
        break;
    }

    const filteredMetrics = metrics.filter(m => {
      const date = new Date(m.date);
      return date >= startDate && date <= endDate;
    });

    setPeriodMetrics(filteredMetrics);

    const newMetricsData: Record<MetricType, MetricData> = {} as Record<MetricType, MetricData>;

    (Object.keys(metricTitles) as MetricType[]).forEach(metric => {
      const values = filteredMetrics.map(m => m[metric]);
      const total = values.reduce((a, b) => a + b, 0);
      const labels = filteredMetrics.map(m => format(new Date(m.date), 'MMM d, yyyy'));
      
      newMetricsData[metric] = {
        labels,
        values,
        total,
        datasets: [{
          label: metricTitles[metric],
          data: values,
          backgroundColor: labels.map((_, index) => {
            const baseColor = metricColors[metric];
            const opacity = 1 - (index * 0.15);
            return baseColor.replace(')', `, ${opacity})`);
          }),
        }],
      };
    });

    setMetricsData(newMetricsData);
  };

  useEffect(() => {
    calculateMetrics();
  }, [selectedPeriod, selectedDate]);

  const getPeriodOptions = () => {
    const now = new Date();
    const options = [];
    
    if (selectedPeriod === 'monthly') {
      for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), i, 1);
        options.push({
          value: date.toISOString(),
          label: format(date, 'MMMM yyyy')
        });
      }
    } else if (selectedPeriod === 'quarterly') {
      for (let i = 0; i < 4; i++) {
        const date = new Date(now.getFullYear(), i * 3, 1);
        options.push({
          value: date.toISOString(),
          label: `Q${i + 1} ${format(date, 'yyyy')}`
        });
      }
    } else {
      options.push({
        value: now.toISOString(),
        label: format(now, 'yyyy')
      });
    }
    
    return options;
  };

  return (
    <div className="max-w-7xl mx-auto bg-gray-50 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-6">Church Metrics Report</h2>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-4">
            <label className="font-medium">Period:</label>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value as PeriodType)}
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="font-medium">Select {selectedPeriod}:</label>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={selectedDate.toISOString()}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
            >
              {getPeriodOptions().map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {Object.entries(metricsData).map(([metric, data]) => 
          data && (
            <MetricBreakdown
              key={metric}
              title={metricTitles[metric as MetricType]}
              data={{
                labels: data.labels,
                datasets: data.datasets
              }}
              total={data.total}
              values={data.values}
              color={metricColors[metric as MetricType]}
            />
          )
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">Sunday Details</h3>
        <SundayMetricsTable metrics={periodMetrics} />
      </div>
    </div>
  );
}