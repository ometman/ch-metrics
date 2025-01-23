// Define base metric interfaces
export interface AttendanceMetrics {
  total: number;
  online: number;
  inPerson: number;
  newVisitors: number;
  children: number;
  youth: number;
  youngAdults: number;
  events: Record<string, number>;
  retentionRate?: number;
}

export interface MembershipMetrics {
  totalMembers: number;
  newMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  churnRate?: number;
}

export interface FinancialMetrics {
  tithes: number;
  offerings: number;
  pledges: number;
  onlineDonations: number;
  inPersonDonations: number;
  recurringGiving: number;
  campaignDonations: Record<string, number>;
  expenses: {
    staff: number;
    facilities: number;
    outreach: number;
    ministries: number;
    other: number;
  };
}

export interface VolunteerMetrics {
  totalHours: number;
  activeVolunteers: number;
  retainedVolunteers: number;
  activities: {
    worship: number;
    children: number;
    youth: number;
    outreach: number;
    administration: number;
    facilities: number;
  };
}

export interface OutreachMetrics {
  eventParticipants: number;
  socialMediaEngagement: {
    followers: number;
    engagement: number;
    reach: number;
  };
  communityPrograms: Record<string, number>;
  baptisms: number;
  dedications: number;
}

export interface EducationalMetrics {
  smallGroups: {
    totalGroups: number;
    totalParticipants: number;
    averageAttendance: number;
  };
  courses: {
    totalCourses: number;
    enrollment: number;
    completion: number;
  };
  youthMinistry: {
    children: number;
    teens: number;
    youngAdults: number;
  };
}

export interface DigitalMetrics {
  livestream: {
    viewers: number;
    peakConcurrent: number;
    averageWatchTime: number;
  };
  website: {
    visitors: number;
    pageViews: number;
    averageSessionDuration: number;
  };
  mobileApp: {
    activeUsers: number;
    engagement: number;
  };
  emailCampaign: {
    sent: number;
    opened: number;
    clicked: number;
  };
}

export interface SpiritualMetrics {
  bibleStudyAttendance: number;
  prayerRequests: number;
  discipleshipParticipants: number;
  spiritualMilestones: number;
}

export interface FacilityMetrics {
  spaceUtilization: Record<string, number>;
  maintenanceCosts: number;
  resourceAllocation: Record<string, number>;
  equipmentUsage: Record<string, number>;
}

export interface ChurchMetrics {
  id: string;
  date: string;
  attendance: AttendanceMetrics;
  membership: MembershipMetrics;
  financial: FinancialMetrics;
  volunteer: VolunteerMetrics;
  outreach: OutreachMetrics;
  educational: EducationalMetrics;
  digital: DigitalMetrics;
  spiritual: SpiritualMetrics;
  facility: FacilityMetrics;
}