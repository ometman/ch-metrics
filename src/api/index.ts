import axios from 'axios';
import type { Student, Course, Enrollment } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const studentApi = {
  getAll: () => api.get<Student[]>('/students').then(res => res.data),
  create: (student: Omit<Student, 'id'>) => api.post<{id: number}>('/students', student).then(res => res.data),
  update: (id: number, student: Partial<Student>) => api.put(`/students/${id}`, student).then(res => res.data),
  delete: (id: number) => api.delete(`/students/${id}`),
};

export const courseApi = {
  getAll: () => api.get<Course[]>('/courses').then(res => res.data),
  create: (course: Omit<Course, 'id'>) => api.post<{id: number}>('/courses', course).then(res => res.data),
  update: (id: number, course: Partial<Course>) => api.put(`/courses/${id}`, course).then(res => res.data),
  delete: (id: number) => api.delete(`/courses/${id}`),
};

export const enrollmentApi = {
  create: (enrollment: Omit<Enrollment, 'enrollment_date'>) => 
    api.post<{success: boolean}>('/enrollments', enrollment).then(res => res.data),
};