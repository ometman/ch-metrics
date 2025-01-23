import React, { useState } from 'react';
import { DigitalMetrics } from '../../../types/metrics';

interface DigitalFormProps {
  initialData?: DigitalMetrics;
  onSave: (data: DigitalMetrics) => void;
  onCancel: () => void;
}

export default function DigitalForm({ initialData, onSave, onCancel }: DigitalFormProps) {
  const [formData, setFormData] = useState<DigitalMetrics>(initialData || {
    livestream: {
      viewers: 0,
      peakConcurrent: 0,
      averageWatchTime: 0
    },
    website: {
      visitors: 0,
      pageViews: 0,
      averageSessionDuration: 0
    },
    mobileApp: {
      activeUsers: 0,
      engagement: 0
    },
    emailCampaign: {
      sent: 0,
      opened: 0,
      clicked: 0
    }
  });

  const handleChange = (field: string, value: number) => {
    const [category, subfield] = field.split('.');
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof DigitalMetrics],
        [subfield]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Livestream</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Viewers
            </label>
            <input
              type="number"
              value={formData.livestream.viewers}
              onChange={(e) => handleChange('livestream.viewers', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peak Concurrent
            </label>
            <input
              type="number"
              value={formData.livestream.peakConcurrent}
              onChange={(e) => handleChange('livestream.peakConcurrent', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Watch Time (minutes)
            </label>
            <input
              type="number"
              value={formData.livestream.averageWatchTime}
              onChange={(e) => handleChange('livestream.averageWatchTime', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Website</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Visitors
            </label>
            <input
              type="number"
              value={formData.website.visitors}
              onChange={(e) => handleChange('website.visitors', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Page Views
            </label>
            <input
              type="number"
              value={formData.website.pageViews}
              onChange={(e) => handleChange('website.pageViews', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Session Duration (minutes)
            </label>
            <input
              type="number"
              value={formData.website.averageSessionDuration}
              onChange={(e) => handleChange('website.averageSessionDuration', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Mobile App</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Active Users
            </label>
            <input
              type="number"
              value={formData.mobileApp.activeUsers}
              onChange={(e) => handleChange('mobileApp.activeUsers', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engagement Rate (%)
            </label>
            <input
              type="number"
              value={formData.mobileApp.engagement}
              onChange={(e) => handleChange('mobileApp.engagement', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Email Campaign</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emails Sent
            </label>
            <input
              type="number"
              value={formData.emailCampaign.sent}
              onChange={(e) => handleChange('emailCampaign.sent', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Emails Opened
            </label>
            <input
              type="number"
              value={formData.emailCampaign.opened}
              onChange={(e) => handleChange('emailCampaign.opened', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Links Clicked
            </label>
            <input
              type="number"
              value={formData.emailCampaign.clicked}
              onChange={(e) => handleChange('emailCampaign.clicked', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}