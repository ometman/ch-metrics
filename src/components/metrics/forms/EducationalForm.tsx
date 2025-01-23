import React, { useState } from 'react';
import { EducationalMetrics } from '../../../types/metrics';

interface EducationalFormProps {
  initialData?: EducationalMetrics;
  onSave: (data: EducationalMetrics) => void;
  onCancel: () => void;
}

export default function EducationalForm({ initialData, onSave, onCancel }: EducationalFormProps) {
  const [formData, setFormData] = useState<EducationalMetrics>(initialData || {
    smallGroups: {
      totalGroups: 0,
      totalParticipants: 0,
      averageAttendance: 0
    },
    courses: {
      totalCourses: 0,
      enrollment: 0,
      completion: 0
    },
    youthMinistry: {
      children: 0,
      teens: 0,
      youngAdults: 0
    }
  });

  const handleChange = (field: string, value: number) => {
    const [category, subfield] = field.split('.');
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof EducationalMetrics],
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
        <h4 className="text-lg font-medium text-gray-900 mb-4">Small Groups</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Groups
            </label>
            <input
              type="number"
              value={formData.smallGroups.totalGroups}
              onChange={(e) => handleChange('smallGroups.totalGroups', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Participants
            </label>
            <input
              type="number"
              value={formData.smallGroups.totalParticipants}
              onChange={(e) => handleChange('smallGroups.totalParticipants', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Average Attendance
            </label>
            <input
              type="number"
              value={formData.smallGroups.averageAttendance}
              onChange={(e) => handleChange('smallGroups.averageAttendance', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Courses</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Courses
            </label>
            <input
              type="number"
              value={formData.courses.totalCourses}
              onChange={(e) => handleChange('courses.totalCourses', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enrollment
            </label>
            <input
              type="number"
              value={formData.courses.enrollment}
              onChange={(e) => handleChange('courses.enrollment', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Completion
            </label>
            <input
              type="number"
              value={formData.courses.completion}
              onChange={(e) => handleChange('courses.completion', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Youth Ministry</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Children
            </label>
            <input
              type="number"
              value={formData.youthMinistry.children}
              onChange={(e) => handleChange('youthMinistry.children', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Teens
            </label>
            <input
              type="number"
              value={formData.youthMinistry.teens}
              onChange={(e) => handleChange('youthMinistry.teens', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Young Adults
            </label>
            <input
              type="number"
              value={formData.youthMinistry.youngAdults}
              onChange={(e) => handleChange('youthMinistry.youngAdults', Number(e.target.value))}
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