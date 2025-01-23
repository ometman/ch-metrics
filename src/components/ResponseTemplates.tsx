import React, { useState } from 'react';
import { ResponseTemplate } from '../types/message';

interface ResponseTemplatesProps {
  templates: ResponseTemplate[];
  onTemplateAdd: (template: ResponseTemplate) => void;
  onTemplateSelect: (template: ResponseTemplate) => void;
}

export default function ResponseTemplates({ 
  templates, 
  onTemplateAdd, 
  onTemplateSelect 
}: ResponseTemplatesProps) {
  const [newTemplate, setNewTemplate] = useState('');
  const [templateName, setTemplateName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplate.trim() || !templateName.trim()) return;

    const template: ResponseTemplate = {
      id: Date.now().toString(),
      content: newTemplate,
      name: templateName
    };

    onTemplateAdd(template);
    setNewTemplate('');
    setTemplateName('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Response Templates</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="E.g., Standard Condolence"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Response Template</label>
            <textarea
              value={newTemplate}
              onChange={(e) => setNewTemplate(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your response template..."
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add Template
          </button>
        </form>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Saved Templates</h3>
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="border rounded-md p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onTemplateSelect(template)}
            >
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <p className="text-gray-600 mt-1">{template.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}