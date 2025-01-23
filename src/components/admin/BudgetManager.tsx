import React, { useState } from 'react';
import { Budget, BUDGET_CATEGORIES } from '../../types/admin';
import BudgetForm from './BudgetForm';
import BudgetTable from './BudgetTable';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function BudgetManager() {
  const [showForm, setShowForm] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('churchBudgets');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = (budget: Budget) => {
    if (selectedBudget) {
      const updated = budgets.map(b => b.id === selectedBudget.id ? budget : b);
      setBudgets(updated);
    } else {
      setBudgets([...budgets, { ...budget, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setSelectedBudget(null);
    localStorage.setItem('churchBudgets', JSON.stringify(budgets));
  };

  const handleEdit = (budget: Budget) => {
    setSelectedBudget(budget);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = budgets.filter(b => b.id !== id);
    setBudgets(updated);
    localStorage.setItem('churchBudgets', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Budget Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Budget
        </button>
      </div>

      {showForm && (
        <BudgetForm
          categories={BUDGET_CATEGORIES}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedBudget(null);
          }}
          initialData={selectedBudget}
        />
      )}

      <BudgetTable
        budgets={budgets}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={BUDGET_CATEGORIES}
      />
    </div>
  );
}