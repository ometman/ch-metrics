import { ChurchMetrics } from '../types/metrics';
import { BASE_METRICS, SPECIAL_EVENTS, SEASONAL_TRENDS } from './constants';

function getWeekOfMonth(date: Date): number {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  return Math.ceil((date.getDate() + firstDayOfMonth.getDay()) / 7);
}

function getEventMultiplier(date: Date): number {
  const month = date.getMonth();
  const weekOfMonth = getWeekOfMonth(date);
  let multiplier = 1.0;

  // Check for special events
  for (const [_, data] of Object.entries(SPECIAL_EVENTS)) {
    if (month === data.month && weekOfMonth === data.week) {
      multiplier *= data.multiplier;
    }
  }

  // Apply seasonal trends
  for (const [_, data] of Object.entries(SEASONAL_TRENDS)) {
    if (month >= data.startMonth && month <= data.endMonth) {
      multiplier *= data.multiplier;
      break;
    }
  }

  // Add weekly pattern (first and last Sundays typically have higher attendance)
  if (weekOfMonth === 1) {
    multiplier *= 1.1; // First Sunday boost
  } else if (weekOfMonth === 5 || (weekOfMonth === 4 && new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() - date.getDate() < 7)) {
    multiplier *= 1.05; // Last Sunday boost
  }

  return multiplier;
}

function addRandomVariation(baseValue: number, variance: number = 0.1): number {
  const randomFactor = 1 - variance + (Math.random() * (variance * 2));
  return Math.round(baseValue * randomFactor);
}

function applyWeatherEffect(date: Date, value: number): number {
  const month = date.getMonth();
  // Reduce attendance during winter months (December-February)
  if (month === 11 || month <= 1) {
    return Math.round(value * (0.9 + Math.random() * 0.2)); // 90-110% of value
  }
  // Reduce attendance during summer vacation months (June-August)
  if (month >= 5 && month <= 7) {
    return Math.round(value * (0.85 + Math.random() * 0.15)); // 85-100% of value
  }
  return value;
}

export function generateMetricsForDate(date: Date): ChurchMetrics {
  const multiplier = getEventMultiplier(date);
  const baseAttendance = addRandomVariation(BASE_METRICS.attendance * multiplier);
  const weatherAdjustedAttendance = applyWeatherEffect(date, baseAttendance);

  // Financial metrics are influenced by attendance and seasonal factors
  const attendanceRatio = weatherAdjustedAttendance / BASE_METRICS.attendance;
  const isHolidaySeason = date.getMonth() >= 10; // November and December
  const givingMultiplier = isHolidaySeason ? 1.2 : 1.0;
  
  return {
    id: date.toISOString(),
    date: date.toISOString().split('T')[0],
    attendance: weatherAdjustedAttendance,
    donations: addRandomVariation(BASE_METRICS.donations * multiplier * attendanceRatio * givingMultiplier),
    offering: addRandomVariation(BASE_METRICS.offering * multiplier * attendanceRatio * givingMultiplier),
    tithes: addRandomVariation(BASE_METRICS.tithes * multiplier * attendanceRatio * givingMultiplier),
    projectOffering: addRandomVariation(BASE_METRICS.projectOffering * multiplier * attendanceRatio * givingMultiplier)
  };
}