import { ChurchMetrics } from '../types/metrics';
import { getSundaysInRange } from './dateUtils';
import { generateMetricsForDate } from './metricGenerators';

export function generateDummyData(): ChurchMetrics[] {
  // Generate data for the entire year 2024
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(2024, 11, 31);  // December 31, 2024
  const sundays = getSundaysInRange(startDate, endDate);
  return sundays.map(sunday => generateMetricsForDate(sunday));
}

export function initializeDummyData(): void {
  const existingData = localStorage.getItem('churchMetrics');
  if (!existingData) {
    const dummyData = generateDummyData();
    localStorage.setItem('churchMetrics', JSON.stringify(dummyData));
    console.log('Dummy data initialized for all weeks of 2024');
  }
}