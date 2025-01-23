import React, { useState } from 'react';
import { AttendanceMetrics } from '../../../types/metrics';

interface AttendanceFormProps {
  initialData?: AttendanceMetrics;
  onSave: (data: AttendanceMetrics) => void;
  onCancel: () => void;
}

export default function AttendanceForm({ initialData, onSave, onCancel }: AttendanceFormProps) {
  const [formData, setFormData] = useState<AttendanceMetrics>(initialData || {
    total: 0,
    online: 0,
    inPerson: 0,
    newVisitors: 0,
    children: 0,
    youth: 0,
    youngAdults: 0,
    events: {},
    retentionRate: 0
  });

  const [newEventName, setNewEventName] = useState('');
  const [newEventAttendance, setNewEventAttendance] = useState('');

  const handleChange = (field: keyof AttendanceMetrics, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddEvent = () => {
    if (newEventName && newEventAttendance) {
      setFormData(prev => ({
        ...prev,
        events: {
          ...prev.events,
          [newEventName]: Number(newEventAttendance)
        }
      }));
      setNewEventName('');
      setNewEventAttendance('');
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
          <label className="block text-sm font-medium text-gray-700">
            Total Attendance
          </label>
          <input
            type="number"
            value={formData.total}
            onChange={(e) => handleChange('total', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Online Attendance
          </label>
          <input
            type="number"
            value={formData.online}
            onChange={(e) => handleChange('online', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            In-Person Attendance
          </label>
          <input
            type="number"
            value={formData.inPerson}
            onChange={(e) => handleChange('inPerson', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Visitors
          </label>
          <input
            type="number"
            value={formData.newVisitors}
            onChange={(e) => handleChange('newVisitors', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Children Attendance
          </label>
          <input
            type="number"
            value={formData.children}
            onChange={(e) => handleChange('children', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Youth Attendance
          </label>
          <input
            type="number"
            value={formData.youth}
            onChange={(e) => handleChange('youth', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Young Adults Attendance
          </label>
          <input
            type="number"
            value={formData.youngAdults}
            onChange={(e) => handleChange('youngAdults', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Retention Rate (%)
          </label>
          <input
            type="number"
            value={formData.retentionRate}
            onChange={(e) => handleChange('retentionRate', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Event Attendance</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Event Name"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Attendance"
              value={newEventAttendance}
              onChange={(e) => setNewEventAttendance(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddEvent}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Event
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(formData.events).map(([event, attendance]) => (
            <div key={event} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{event}</span>
              <span>{attendance}</span>
            </div>
          ))}
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