import { useState } from 'react';
import { ChurchMetrics } from '../types/metrics';

export default function MetricsInput() {
  const [metrics, setMetrics] = useState<Partial<ChurchMetrics>>({
    date: new Date().toISOString().split('T')[0],
    attendance: {
      total: 0,
      firstTimeVisitors: 0,
      children: 0,
      youth: 0,
      volunteers: 0
    },
    finances: {
      tithes: 0,
      offerings: 0,
      projectOffering: 0,
      onlineDonations: 0,
      inPersonDonations: 0
    },
    ministry: {
      smallGroups: 0,
      bibleStudies: 0,
      prayerMeetings: 0,
      baptisms: 0,
      conversions: 0
    },
    volunteers: {
      totalHours: 0,
      worshipTeam: 0,
      childrenMinistry: 0,
      youthMinistry: 0,
      ushers: 0,
      techTeam: 0
    },
    outreach: {
      events: 0,
      participants: 0,
      newContacts: 0,
      followUps: 0
    },
    communication: {
      newsletterOpens: 0,
      socialMediaEngagement: 0,
      eventRegistrations: 0
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const savedMetrics = JSON.parse(localStorage.getItem('churchMetrics') || '[]');
    const newMetrics = {
      ...metrics,
      id: Date.now().toString(),
    };
    localStorage.setItem('churchMetrics', JSON.stringify([...savedMetrics, newMetrics]));
    alert('Metrics saved successfully!');
    setIsModalOpen(false); // Close modal after saving
  };

  const handleChange = (category: string, field: string, value: string) => {
    setMetrics(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof ChurchMetrics],
        [field]: Number(value)
      }
    }));
  };

  const renderInputSection = (title: string, category: string, fields: Record<string, string>) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(fields).map(([field, label]) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type="number"
              min="0"
              value={metrics[category as keyof ChurchMetrics]?.[field] || 0}
              onChange={(e) => handleChange(category, field, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Sunday Metrics</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
      >
        Add Metrics
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h3 className="text-2xl font-bold mb-6">Enter Metrics</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={metrics.date}
                  onChange={(e) => setMetrics(prev => ({ ...prev, date: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {renderInputSection('Attendance', 'attendance', {
                total: 'Total Attendance',
                firstTimeVisitors: 'First-time Visitors',
                children: 'Children',
                youth: 'Youth',
                volunteers: 'Volunteers'
              })}

              {renderInputSection('Finances', 'finances', {
                tithes: 'Tithes',
                offerings: 'Offerings',
                projectOffering: 'Project Offering',
                onlineDonations: 'Online Donations',
                inPersonDonations: 'In-person Donations'
              })}

              {renderInputSection('Ministry', 'ministry', {
                smallGroups: 'Small Groups',
                bibleStudies: 'Bible Studies',
                prayerMeetings: 'Prayer Meetings',
                baptisms: 'Baptisms',
                conversions: 'Conversions'
              })}

              {renderInputSection('Volunteers', 'volunteers', {
                totalHours: 'Total Hours',
                worshipTeam: 'Worship Team',
                childrenMinistry: "Children's Ministry",
                youthMinistry: 'Youth Ministry',
                ushers: 'Ushers',
                techTeam: 'Tech Team'
              })}

              {renderInputSection('Outreach', 'outreach', {
                events: 'Events',
                participants: 'Participants',
                newContacts: 'New Contacts',
                followUps: 'Follow-ups'
              })}

              {renderInputSection('Communication', 'communication', {
                newsletterOpens: 'Newsletter Opens',
                socialMediaEngagement: 'Social Media Engagement',
                eventRegistrations: 'Event Registrations'
              })}

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save Metrics
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
