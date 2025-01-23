import React, { useState } from 'react';
import { Target, TargetCategory } from '../../types/admin';

interface TargetFormProps {
  categories: TargetCategory[];
  onSave: (target: Target) => void;
  onCancel: () => void;
  initialData?: Target | null;
}

export default function TargetForm({ categories, onSave, onCancel, initialData }: TargetFormProps) {
  const [formData, setFormData] = useState<Partial<Target>>(
    initialData || {
      year: new Date().getFullYear(),
      target: 0,
      type: 'attendance'
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'target' || name === 'year' ? Number(value) || 0 : value
    }));
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const period = e.target.value;
    setFormData(prev => ({
      ...prev,
      month: period === 'month' ? 1 : undefined,
      quarter: period === 'quarter' ? 1 : undefined
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Target);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year || new Date().getFullYear()}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Period</label>
          <select
            name="period"
            value={formData.month ? 'month' : formData.quarter ? 'quarter' : 'year'}
            onChange={handlePeriodChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="year">Annual</option>
            <option value="quarter">Quarterly</option>
            <option value="month">Monthly</option>
          </select>
        </div>

        {formData.month && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Month</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        )}

        {formData.quarter && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Quarter</label>
            <select
              name="quarter"
              value={formData.quarter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {[1, 2, 3, 4].map(q => (
                <option key={q} value={q}>Q{q}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category || ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        {formData.category && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Subcategory</label>
            <select
              name="subcategory"
              value={formData.subcategory || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Subcategory</option>
              {categories
                .find(cat => cat.id === formData.category)
                ?.subcategories?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Target</label>
          <input
            type="number"
            name="target"
            value={formData.target || 0}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
}