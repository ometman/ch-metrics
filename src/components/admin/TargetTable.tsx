import React from 'react';
import { Target, TargetCategory } from '../../types/admin';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import BudgetTable from "./BudgetTable";


interface TargetTableProps {
  targets: Target[];
  onEdit: (target: Target) => void;
  onDelete: (id: string) => void;
  categories: TargetCategory[];
}

export default function TargetTable({ targets, onEdit, onDelete, categories }: TargetTableProps) {
  const getPeriodLabel = (target: Target) => {
    if (target.month) {
      return `${new Date(2024, target.month - 1).toLocaleString('default', { month: 'long' })} ${target.year}`;
    }
    if (target.quarter) {
      return `Q${target.quarter} ${target.year}`;
    }
    return `${target.year}`;
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || categoryId;
  };

  const getProgressColor = (target: Target) => {
    if (!target.actual) return 'bg-gray-200';
    const progress = (target.actual / target.target) * 100;
    if (progress >= 100) return 'bg-green-500';
    if (progress >= 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getProgress = (target: Target) => {
    if (!target.actual) return 0;
    return Math.min((target.actual / target.target) * 100, 100);
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
              Target
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Progress
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {targets.map((target) => (
            <tr key={target.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getPeriodLabel(target)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getCategoryName(target.category)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {target.subcategory}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {target.target.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full ${getProgressColor(target)}`}
                      style={{ width: `${getProgress(target)}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {target.actual ? `${Math.round((target.actual / target.target) * 100)}%` : 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(target)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(target.id)}
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