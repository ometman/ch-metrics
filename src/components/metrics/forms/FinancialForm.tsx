import React, { useState } from 'react';
import { FinancialMetrics } from '../../../types/metrics';

interface FinancialFormProps {
  initialData?: FinancialMetrics;
  onSave: (data: FinancialMetrics) => void;
  onCancel: () => void;
}

export default function FinancialForm({ initialData, onSave, onCancel }: FinancialFormProps) {
  const [formData, setFormData] = useState<FinancialMetrics>(initialData || {
    tithes: 0,
    offerings: 0,
    pledges: 0,
    onlineDonations: 0,
    inPersonDonations: 0,
    recurringGiving: 0,
    campaignDonations: {},
    expenses: {
      staff: 0,
      facilities: 0,
      outreach: 0,
      ministries: 0,
      other: 0
    }
  });

  const handleChange = (field: string, value: number) => {
    if (field.startsWith('expenses.')) {
      const expenseField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        expenses: {
          ...prev.expenses,
          [expenseField]: value
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
          <label className="block text-sm font-medium text-gray-700">Tithes</label>
          <input
            type="number"
            value={formData.tithes}
            onChange={(e) => handleChange('tithes', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Offerings</label>
          <input
            type="number"
            value={formData.offerings}
            onChange={(e) => handleChange('offerings', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pledges</label>
          <input
            type="number"
            value={formData.pledges}
            onChange={(e) => handleChange('pledges', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Online Donations</label>
          <input
            type="number"
            value={formData.onlineDonations}
            onChange={(e) => handleChange('onlineDonations', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">In-Person Donations</label>
          <input
            type="number"
            value={formData.inPersonDonations}
            onChange={(e) => handleChange('inPersonDonations', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Recurring Giving</label>
          <input
            type="number"
            value={formData.recurringGiving}
            onChange={(e) => handleChange('recurringGiving', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Expenses</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Staff</label>
            <input
              type="number"
              value={formData.expenses.staff}
              onChange={(e) => handleChange('expenses.staff', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Facilities</label>
            <input
              type="number"
              value={formData.expenses.facilities}
              onChange={(e) => handleChange('expenses.facilities', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Outreach</label>
            <input
              type="number"
              value={formData.expenses.outreach}
              onChange={(e) => handleChange('expenses.outreach', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Ministries</label>
            <input
              type="number"
              value={formData.expenses.ministries}
              onChange={(e) => handleChange('expenses.ministries', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Other</label>
            <input
              type="number"
              value={formData.expenses.other}
              onChange={(e) => handleChange('expenses.other', Number(e.target.value))}
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