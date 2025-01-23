import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Student } from '../../types';

interface StudentRowProps {
  student: Student;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function StudentRow({ student, onEdit, onDelete }: StudentRowProps) {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={student.avatar}
              alt={student.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{student.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="h-4 w-4 mr-1" />
            {student.email}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Phone className="h-4 w-4 mr-1" />
            {student.phone}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="h-4 w-4 mr-1" />
          {student.location}
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-wrap gap-2">
          {student.courses?.map((course, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {course}
            </span>
          ))}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button 
          onClick={() => onEdit(student.id)}
          className="text-indigo-600 hover:text-indigo-900 mr-4"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}