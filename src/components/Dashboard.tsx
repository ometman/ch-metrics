import React from 'react';
import { Layers, Users, BookOpen, Award } from 'lucide-react';

const StatCard = ({ icon: Icon, title, value, change }: { icon: any, title: string, value: string, change: string }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Icon className="h-6 w-6 text-gray-400" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{value}</div>
              <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                {change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Users}
          title="Total Students"
          value="1,234"
          change="+4.75%"
        />
        <StatCard
          icon={BookOpen}
          title="Active Courses"
          value="42"
          change="+12.5%"
        />
        <StatCard
          icon={Layers}
          title="Course Completion"
          value="87%"
          change="+2.3%"
        />
        <StatCard
          icon={Award}
          title="Certifications"
          value="856"
          change="+8.2%"
        />
      </div>

      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  New student enrolled in Advanced React Course
                </p>
                <p className="text-sm text-gray-500">
                  {i} hour{i !== 1 ? 's' : ''} ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;