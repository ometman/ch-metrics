export function getSundaysInRange(startDate: Date, endDate: Date): Date[] {
  const sundays: Date[] = [];
  let currentDate = new Date(startDate);

  // Find first Sunday
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Collect all Sundays
  while (currentDate <= endDate) {
    sundays.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  return sundays;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}