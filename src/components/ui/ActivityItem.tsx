import React from 'react';
import { Users } from 'lucide-react';

interface ActivityItemProps {
  message: string;
  time: string;
}

export function ActivityItem({ message, time }: ActivityItemProps) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex-shrink-0">
        <Users className="h-6 w-6 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );
}