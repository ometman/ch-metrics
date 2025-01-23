import React from 'react';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import ProgressRing from './ProgressRing';
import { UsersIcon, ChartBarIcon, HeartIcon, UserGroupIcon } from '@heroicons/react/24/outline';

export default function Dashboard() {
  const attendanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Attendance',
        data: [150, 180, 170, 190, 210, 235],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const givingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Giving',
        data: [5000, 5500, 5200, 6000, 6200, 6500],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Church Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Attendance"
          value="235"
          trend={12}
          icon={<UsersIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="New Visitors"
          value="28"
          trend={8}
          icon={<UserGroupIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="Total Giving"
          value="$6,500"
          trend={15}
          icon={<ChartBarIcon className="w-6 h-6" />}
        />
        <MetricCard
          title="Volunteer Hours"
          value="156"
          trend={5}
          icon={<HeartIcon className="w-6 h-6" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Attendance Trends" data={attendanceData} />
        <ChartCard title="Giving Trends" data={givingData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Member Engagement</h3>
          <div className="flex justify-center">
            <ProgressRing progress={78} />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Active Members</p>
            <p className="text-lg font-semibold">156 of 200</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Ministry Participation</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Small Groups</span>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '85%' }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bible Studies</span>
              <span className="text-sm font-medium">72%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '72%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-4">Volunteer Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Worship Team</span>
              <span className="text-sm font-medium">25</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Children's Ministry</span>
              <span className="text-sm font-medium">32</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Ushers</span>
              <span className="text-sm font-medium">18</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Tech Team</span>
              <span className="text-sm font-medium">15</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}