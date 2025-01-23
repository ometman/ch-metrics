import React, { useState } from 'react';
import { ChurchMetrics } from '../../types/metrics';
import AttendanceForm from './forms/AttendanceForm';
import MembershipForm from './forms/MembershipForm';
import FinancialForm from './forms/FinancialForm';
import VolunteerForm from './forms/VolunteerForm';
import OutreachForm from './forms/OutreachForm';
import EducationalForm from './forms/EducationalForm';
import DigitalForm from './forms/DigitalForm';
import SpiritualForm from './forms/SpiritualForm';
import FacilityForm from './forms/FacilityForm';
import MetricsFormModal from './MetricsFormModal';
import { Tab } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MetricsInput() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Partial<ChurchMetrics>>({
    date: new Date().toISOString().split('T')[0],
  });

  const categories = [
    { id: 'attendance', name: 'Attendance', component: AttendanceForm },
    { id: 'membership', name: 'Membership', component: MembershipForm },
    { id: 'financial', name: 'Financial', component: FinancialForm },
    { id: 'volunteer', name: 'Volunteer', component: VolunteerForm },
    { id: 'outreach', name: 'Outreach', component: OutreachForm },
    { id: 'educational', name: 'Educational', component: EducationalForm },
    { id: 'digital', name: 'Digital', component: DigitalForm },
    { id: 'spiritual', name: 'Spiritual', component: SpiritualForm },
    { id: 'facility', name: 'Facility', component: FacilityForm },
  ];

  const handleSave = (category: string, data: any) => {
    setMetrics(prev => ({
      ...prev,
      [category]: data
    }));
    setSelectedCategory(null);
  };

  const handleSubmitAll = () => {
    const finalMetrics = {
      ...metrics,
      id: Date.now().toString(),
    };
    
    const savedMetrics = JSON.parse(localStorage.getItem('churchMetrics') || '[]');
    localStorage.setItem('churchMetrics', JSON.stringify([...savedMetrics, finalMetrics]));
    
    setMetrics({
      date: new Date().toISOString().split('T')[0],
    });
    
    alert('All metrics saved successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Metrics Input</h2>
          <div className="flex space-x-4">
            <input
              type="date"
              value={metrics.date}
              onChange={(e) => setMetrics(prev => ({ ...prev, date: e.target.value }))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              onClick={handleSubmitAll}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save All Metrics
            </button>
          </div>
        </div>

        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/20 p-1">
            {categories.map((category) => (
              <Tab
                key={category.id}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-indigo-700 shadow'
                      : 'text-gray-600 hover:bg-white/[0.12] hover:text-indigo-600'
                  )
                }
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>

        {selectedCategory && (
          <MetricsFormModal
            isOpen={!!selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onSave={(data) => handleSave(selectedCategory, data)}
            title={categories.find(c => c.id === selectedCategory)?.name || ''}
            initialData={metrics[selectedCategory as keyof ChurchMetrics]}
            FormComponent={categories.find(c => c.id === selectedCategory)?.component}
          />
        )}

        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Metrics Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedCategory(category.id)}
              >
                <h4 className="font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-500">
                  {metrics[category.id as keyof ChurchMetrics] 
                    ? 'Data entered' 
                    : 'No data entered'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}