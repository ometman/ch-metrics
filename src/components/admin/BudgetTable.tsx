 
            import React from 'react';
import { Budget, BudgetCategory } from '../../types/admin';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

interface BudgetTableProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
  categories: BudgetCategory[];
}

export default function BudgetTable({ budgets, onEdit, onDelete, categories }: BudgetTableProps) {
  const getPeriodLabel = (budget: Budget) => {
    if (budget.month) {
      return `${new Date(2024, budget.month - 1).toLocaleString('default', { month: 'long' })} ${budget.year}`;
    }
    if (budget.quarter) {
      return `Q${budget.quarter} ${budget.year}`;
    }
    return `${budget.year}`;
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Period
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subcategory
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getPeriodLabel(budget)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getCategoryName(budget.category)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {budget.subcategory}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${budget.amount.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  budget.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {budget.type.charAt(0).toUpperCase() + budget.type.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(budget)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(budget.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}