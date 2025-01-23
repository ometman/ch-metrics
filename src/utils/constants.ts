export const BASE_METRICS = {
  attendance: 150,
  donations: 2000,
  offering: 1500,
  tithes: 3000,
  projectOffering: 1000
} as const;

// Special events with their multipliers for 2024
export const SPECIAL_EVENTS = {
  NEW_YEAR: { month: 0, week: 1, multiplier: 1.4 },        // New Year's Sunday
  EASTER: { month: 2, week: 5, multiplier: 1.8 },          // Easter Sunday (March 31, 2024)
  MOTHERS_DAY: { month: 4, week: 2, multiplier: 1.5 },     // Mother's Day (May 12, 2024)
  PENTECOST: { month: 4, week: 3, multiplier: 1.3 },       // Pentecost (May 19, 2024)
  FATHERS_DAY: { month: 5, week: 3, multiplier: 1.3 },     // Father's Day (June 16, 2024)
  THANKSGIVING: { month: 10, week: 4, multiplier: 1.4 },    // Thanksgiving Weekend
  CHRISTMAS: { month: 11, week: 4, multiplier: 1.8 }       // Christmas Week
} as const;

// Seasonal trends affecting attendance and giving
export const SEASONAL_TRENDS = {
  WINTER_REVIVAL: { startMonth: 0, endMonth: 1, multiplier: 1.2 },    // January-February
  SPRING_GROWTH: { startMonth: 2, endMonth: 4, multiplier: 1.1 },     // March-May
  SUMMER_LOW: { startMonth: 5, endMonth: 7, multiplier: 0.8 },        // June-August
  FALL_RETURN: { startMonth: 8, endMonth: 9, multiplier: 1.1 },       // September-October
  HOLIDAY_SEASON: { startMonth: 10, endMonth: 11, multiplier: 1.3 }   // November-December
} as const;