import React, { useState } from 'react';
import { Target, TARGET_CATEGORIES } from '../../types/admin';
import TargetForm from './TargetForm';
import TargetTable from './TargetTable';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function TargetManager() {
  const [showForm, setShowForm] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState<Target | null>(null);
  const [targets, setTargets] = useState<Target[]>(() => {
    const saved = localStorage.getItem('churchTargets');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = (target: Target) => {
    if (selectedTarget) {
      const updated = targets.map(t => t.id === selectedTarget.id ? target : t);
      setTargets(updated);
    } else {
      setTargets([...targets, { ...target, id: Date.now().toString() }]);
    }
    setShowForm(false);
    setSelectedTarget(null);
    localStorage.setItem('churchTargets', JSON.stringify(targets));
  };

  const handleEdit = (target: Target) => {
    setSelectedTarget(target);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = targets.filter(t => t.id !== id);
    setTargets(updated);
    localStorage.setItem('churchTargets', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Target Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Target
        </button>
      </div>

      {showForm && (
        <TargetForm
          categories={TARGET_CATEGORIES}
          onSave={handleSave}
          onCancel={() => {
            setShowForm(false);
            setSelectedTarget(null);
          }}
          initialData={selectedTarget}
        />
      )}

      <TargetTable
        targets={targets}
        onEdit={handleEdit}
        onDelete={handleDelete}
        categories={TARGET_CATEGORIES}
      />
    </div>
  );
}