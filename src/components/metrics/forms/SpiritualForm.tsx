import React, { useState } from 'react';
import { SpiritualMetrics } from '../../../types/metrics';

interface SpiritualFormProps {
  initialData?: SpiritualMetrics;
  onSave: (data: SpiritualMetrics) => void;
  onCancel: () => void;
}

export default function SpiritualForm({ initialData, onSave, onCancel }: SpiritualFormProps) {
  const [formData, setFormData] = useState<SpiritualMetrics>(initialData || {
    bibleStudyAttendance: 0,
    prayerRequests: 0,
    discipleshipParticipants: 0,
    spiritualMilestones: 0
  });

  const handleChange = (field: keyof SpiritualMetrics, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bible Study Attendance
          </label>
          <input
            type="number"
            value={formData.bibleStudyAttendance}
            onChange={(e) => handleChange('bibleStudyAttendance', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Prayer Requests
          </label>
          <input
            type="number"
            value={formData.prayerRequests}
            onChange={(e) => handleChange('prayerRequests', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discipleship Participants
          </label>
          <input
            type="number"
            value={formData.discipleshipParticipants}
            onChange={(e) => handleChange('discipleshipParticipants', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Spiritual Milestones
          </label>
          <input
            type="number"
            value={formData.spiritualMilestones}
            onChange={(e) => handleChange('spiritualMilestones', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
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