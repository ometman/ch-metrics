export interface Budget {
  id: string;
  year: number;
  month?: number;
  quarter?: number;
  category: string;
  subcategory?: string;
  amount: number;
  actual?: number;
  type: 'income' | 'expense';
}

export interface Target {
  id: string;
  year: number;
  month?: number;
  quarter?: number;
  category: string;
  subcategory?: string;
  target: number;
  actual?: number;
  type: 'attendance' | 'engagement' | 'volunteer' | 'outreach' | 'giving';
}

export interface BudgetCategory {
  id: string;
  name: string;
  subcategories?: string[];
  type: 'income' | 'expense';
}

export interface TargetCategory {
  id: string;
  name: string;
  subcategories?: string[];
  type: 'attendance' | 'engagement' | 'volunteer' | 'outreach' | 'giving';
}

export const BUDGET_CATEGORIES: BudgetCategory[] = [
  {
    id: 'income',
    name: 'Income',
    type: 'income',
    subcategories: ['Tithes', 'Offerings', 'Project Donations', 'Other Income']
  },
  {
    id: 'facilities',
    name: 'Facilities',
    type: 'expense',
    subcategories: ['Maintenance', 'Utilities', 'Insurance', 'Improvements']
  },
  {
    id: 'ministries',
    name: 'Ministries',
    type: 'expense',
    subcategories: ['Children', 'Youth', 'Adult', 'Worship', 'Outreach']
  },
  {
    id: 'staff',
    name: 'Staff',
    type: 'expense',
    subcategories: ['Salaries', 'Benefits', 'Training', 'Travel']
  },
  {
    id: 'missions',
    name: 'Missions',
    type: 'expense',
    subcategories: ['Local', 'International', 'Special Projects']
  }
];

export const TARGET_CATEGORIES: TargetCategory[] = [
  {
    id: 'attendance',
    name: 'Attendance',
    type: 'attendance',
    subcategories: ['Total', 'First Time Visitors', 'Children', 'Youth', 'Young Adults']
  },
  {
    id: 'engagement',
    name: 'Engagement',
    type: 'engagement',
    subcategories: ['Small Groups', 'Bible Studies', 'Prayer Meetings', 'Events']
  },
  {
    id: 'volunteer',
    name: 'Volunteer',
    type: 'volunteer',
    subcategories: ['Total Hours', 'Worship Team', 'Children Ministry', 'Youth Ministry', 'Ushers']
  },
  {
    id: 'outreach',
    name: 'Outreach',
    type: 'outreach',
    subcategories: ['Events', 'Participants', 'Conversions', 'Baptisms']
  },
  {
    id: 'giving',
    name: 'Giving',
    type: 'giving',
    subcategories: ['Total', 'Per Capita', 'First Time Givers', 'Regular Givers']
  }
];