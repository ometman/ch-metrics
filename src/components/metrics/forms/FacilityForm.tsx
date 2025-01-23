import React, { useState } from 'react';
import { FacilityMetrics } from '../../../types/metrics';

interface FacilityFormProps {
  initialData?: FacilityMetrics;
  onSave: (data: FacilityMetrics) => void;
  onCancel: () => void;
}

export default function FacilityForm({ initialData, onSave, onCancel }: FacilityFormProps) {
  const [formData, setFormData] = useState<FacilityMetrics>(initialData || {
    spaceUtilization: {},
    maintenanceCosts: 0,
    resourceAllocation: {},
    equipmentUsage: {}
  });

  const [newSpace, setNewSpace] = useState({ name: '', utilization: '' });
  const [newResource, setNewResource] = useState({ name: '', allocation: '' });
  const [newEquipment, setNewEquipment] = useState({ name: '', usage: '' });

  const handleChange = (field: keyof FacilityMetrics, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSpace = () => {
    if (newSpace.name && newSpace.utilization) {
      setFormData(prev => ({
        ...prev,
        spaceUtilization: {
          ...prev.spaceUtilization,
          [newSpace.name]: Number(newSpace.utilization)
        }
      }));
      setNewSpace({ name: '', utilization: '' });
    }
  };

  const handleAddResource = () => {
    if (newResource.name && newResource.allocation) {
      setFormData(prev => ({
        ...prev,
        resourceAllocation: {
          ...prev.resourceAllocation,
          [newResource.name]: Number(newResource.allocation)
        }
      }));
      setNewResource({ name: '', allocation: '' });
    }
  };

  const handleAddEquipment = () => {
    if (newEquipment.name && newEquipment.usage) {
      setFormData(prev => ({
        ...prev,
        equipmentUsage: {
          ...prev.equipmentUsage,
          [newEquipment.name]: Number(newEquipment.usage)
        }
      }));
      setNewEquipment({ name: '', usage: '' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Space Utilization</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Space Name"
            value={newSpace.name}
            onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Utilization (%)"
            value={newSpace.utilization}
            onChange={(e) => setNewSpace({ ...newSpace, utilization: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddSpace}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Space
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(formData.spaceUtilization).map(([space, utilization]) => (
            <div key={space} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{space}</span>
              <span>{utilization}%</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Maintenance Costs</h4>
        <input
          type="number"
          value={formData.maintenanceCosts}
          onChange={(e) => handleChange('maintenanceCosts', Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Resource Allocation</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Resource Name"
            value={newResource.name}
            onChange={(e) => setNewResource({ ...newResource, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Allocation Amount"
            value={newResource.allocation}
            onChange={(e) => setNewResource({ ...newResource, allocation: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddResource}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Resource
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(formData.resourceAllocation).map(([resource, allocation]) => (
            <div key={resource} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{resource}</span>
              <span>${allocation}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Equipment Usage</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Equipment Name"
            value={newEquipment.name}
            onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            type="number"
            placeholder="Usage Hours"
            value={newEquipment.usage}
            onChange={(e) => setNewEquipment({ ...newEquipment, usage: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="button"
            onClick={handleAddEquipment}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Add Equipment
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(formData.equipmentUsage).map(([equipment, usage]) => (
            <div key={equipment} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span>{equipment}</span>
              <span>{usage} hours</span>
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