import React, { useState } from 'react';
import { VolunteerMetrics } from '../../../types/metrics';

interface VolunteerFormProps {
  initialData?: VolunteerMetrics;
  onSave: (data: VolunteerMetrics) => void;
  onCancel: () => void;
}

export default function VolunteerForm({ initialData, onSave, onCancel }: VolunteerFormProps) {
  const [formData, setFormData] = useState<VolunteerMetrics>(initialData || {
    totalHours: 0,
    activeVolunteers: 0,
    retainedVolunteers: 0,
    activities: {
      worship: 0,
      children: 0,
      youth: 0,
      outreach: 0,
      administration: 0,
      facilities: 0
    }
  });

  const handleChange = (field: string, value: number) => {
    if (field.startsWith('activities.')) {
      const activityField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        activities: {
          ...prev.activities,
          [activityField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Total Hours</label>
          <input
            type="number"
            value={formData.totalHours}
            onChange={(e) => handleChange('totalHours', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Active Volunteers</label>
          <input
            type="number"
            value={formData.activeVolunteers}
            onChange={(e) => handleChange('activeVolunteers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Retained Volunteers</label>
          <input
            type="number"
            value={formData.retainedVolunteers}
            onChange={(e) => handleChange('retainedVolunteers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Activities</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Worship</label>
            <input
              type="number"
              value={formData.activities.worship}
              onChange={(e) => handleChange('activities.worship', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Children</label>
            <input
              type="number"
              value={formData.activities.children}
              onChange={(e) => handleChange('activities.children', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Youth</label>
            <input
              type="number"
              value={formData.activities.youth}
              onChange={(e) => handleChange('activities.youth', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Outreach</label>
            <input
              type="number"
              value={formData.activities.outreach}
              onChange={(e) => handleChange('activities.outreach', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Administration</label>
            <input
              type="number"
              value={formData.activities.administration}
              onChange={(e) => handleChange('activities.administration', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facilities</label>
            <input
              type="number"
              value={formData.activities.facilities}
              onChange={(e) => handleChange('activities.facilities', Number(e.target.value))}
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