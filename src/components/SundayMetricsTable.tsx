import { useState } from 'react';
import { ChurchMetrics } from '../types/metrics';

export default function MetricsInput() {
  const [metrics, setMetrics] = useState<Partial<ChurchMetrics>>({
    // initialize metrics data here
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetric, setActiveMetric] = useState<string | null>(null);

  // Define metric categories
  const metricCategories = [
    { name: 'Attendance', fields: { total: 'Total Attendance', firstTimeVisitors: 'First-time Visitors', children: 'Children', youth: 'Youth', volunteers: 'Volunteers' }},
    { name: 'Finances', fields: { tithes: 'Tithes', offerings: 'Offerings', projectOffering: 'Project Offering', onlineDonations: 'Online Donations', inPersonDonations: 'In-person Donations' }},
    { name: 'Ministry', fields: { smallGroups: 'Small Groups', bibleStudies: 'Bible Studies', prayerMeetings: 'Prayer Meetings', baptisms: 'Baptisms', conversions: 'Conversions' }},
    // Add more categories as needed
  ];

  const openModal = (metric: string) => {
    setActiveMetric(metric);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveMetric(null);
  };

  // Render a button for each metric category
  const renderButtonForMetric = (category: { name: string }) => (
    <button
      key={category.name}
      onClick={() => openModal(category.name)}
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 mb-2"
    >
      + {category.name}
    </button>
  );

  // Render the content inside the modal based on activeMetric
  const renderModalContent = () => {
    const selectedCategory = metricCategories.find(category => category.name === activeMetric);
    if (!selectedCategory) return null;

    return (
      <div className="space-y-4">
        {Object.entries(selectedCategory.fields).map(([field, label]) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="number"
              min="0"
              value={metrics[selectedCategory.name as keyof ChurchMetrics]?.[field] || 0}
              onChange={(e) => setMetrics(prev => ({
                ...prev,
                [selectedCategory.name]: {
                  ...(prev[selectedCategory.name as keyof ChurchMetrics] || {}),
                  [field]: Number(e.target.value),
                },
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Sunday Metrics Input</h2>

      {/* Render buttons for each metric category */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {metricCategories.map(renderButtonForMetric)}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">{activeMetric} Input</h3>
            {renderModalContent()}
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  closeModal();
                  alert(`${activeMetric} data saved!`);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
