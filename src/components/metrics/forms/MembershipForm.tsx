import React, { useState } from 'react';
import { MembershipMetrics } from '../../../types/metrics';

interface MembershipFormProps {
  initialData?: MembershipMetrics;
  onSave: (data: MembershipMetrics) => void;
  onCancel: () => void;
}

export default function MembershipForm({ initialData, onSave, onCancel }: MembershipFormProps) {
  const [formData, setFormData] = useState<MembershipMetrics>(initialData || {
    totalMembers: 0,
    newMembers: 0,
    activeMembers: 0,
    inactiveMembers: 0,
    churnRate: 0
  });

  const handleChange = (field: keyof MembershipMetrics, value: number) => {
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
            Total Members
          </label>
          <input
            type="number"
            value={formData.totalMembers}
            onChange={(e) => handleChange('totalMembers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Members
          </label>
          <input
            type="number"
            value={formData.newMembers}
            onChange={(e) => handleChange('newMembers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Active Members
          </label>
          <input
            type="number"
            value={formData.activeMembers}
            onChange={(e) => handleChange('activeMembers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Inactive Members
          </label>
          <input
            type="number"
            value={formData.inactiveMembers}
            onChange={(e) => handleChange('inactiveMembers', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Churn Rate (%)
          </label>
          <input
            type="number"
            value={formData.churnRate}
            onChange={(e) => handleChange('churnRate', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            step="0.1"
            min="0"
            max="100"
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