import React, { useState } from 'react';
import { OutreachMetrics } from '../../../types/metrics';

interface OutreachFormProps {
  initialData?: OutreachMetrics;
  onSave: (data: OutreachMetrics) => void;
  onCancel: () => void;
}

export default function OutreachForm({ initialData, onSave, onCancel }: OutreachFormProps) {
  const [formData, setFormData] = useState<OutreachMetrics>(initialData || {
    eventParticipants: 0,
    socialMediaEngagement: {
      followers: 0,
      engagement: 0,
      reach: 0
    },
    communityPrograms: {},
    baptisms: 0,
    dedications: 0
  });

  const [newProgramName, setNewProgramName] = useState('');
  const [newProgramParticipants, setNewProgramParticipants] = useState('');

  const handleChange = (field: string, value: number) => {
    if (field.startsWith('socialMediaEngagement.')) {
      const engagementField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMediaEngagement: {
          ...prev.socialMediaEngagement,
          [engagementField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleAddProgram = () => {
    if (newProgramName && newProgramParticipants) {
      setFormData(prev => ({
        ...prev,
        communityPrograms: {
          ...prev.communityPrograms,
          [newProgramName]: Number(newProgramParticipants)
        }
      }));
      setNewProgramName('');
      setNewProgramParticipants('');
    }
  };

  const handleRemoveProgram = (programName: string) => {
    setFormData(prev => {
      const newPrograms = { ...prev.communityPrograms };
      delete newPrograms[programName];
      return {
        ...prev,
        communityPrograms: newPrograms
      };
    });
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
            Event Participants
          </label>
          <input
            type="number"
            value={formData.eventParticipants}
            onChange={(e) => handleChange('eventParticipants', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Baptisms
          </label>
          <input
            type="number"
            value={formData.baptisms}
            onChange={(e) => handleChange('baptisms', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Dedications
          </label>
          <input
            type="number"
            value={formData.dedications}
            onChange={(e) => handleChange('dedications', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media Engagement</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Followers
            </label>
            <input
              type="number"
              value={formData.socialMediaEngagement.followers}
              onChange={(e) => handleChange('socialMediaEngagement.followers', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engagement
            </label>
            <input
              type="number"
              value={formData.socialMediaEngagement.engagement}
              onChange={(e) => handleChange('socialMediaEngagement.engagement', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reach
            </label>
            <input
              type="number"
              value={formData.socialMediaEngagement.reach}
              onChange={(e) => handleChange('socialMediaEngagement.reach', Number(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Community Programs</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Program Name"
              value={newProgramName}
              onChange={(e) => setNewProgramName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Participants"
              value={newProgramParticipants}
              onChange={(e) => setNewProgramParticipants(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="button"
              onClick={handleAddProgram}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add Program
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {Object.entries(formData.communityPrograms).map(([program, participants]) => (
            <div key={program} className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{program}</span>
              <div className="flex items-center space-x-4">
                <span>{participants} participants</span>
                <button
                  type="button"
                  onClick={() => handleRemoveProgram(program)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
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