import React from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface MetricsFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  title: string;
  initialData?: any;
  FormComponent: React.ComponentType<any>;
}

export default function MetricsFormModal({
  isOpen,
  onClose,
  onSave,
  title,
  initialData,
  FormComponent
}: MetricsFormModalProps) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg max-w-3xl w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              {title} Metrics
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            <FormComponent
              initialData={initialData}
              onSave={(data: any) => {
                onSave(data);
                onClose();
              }}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
}