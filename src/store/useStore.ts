import { create } from 'zustand';
import type { Student, Course } from '../types';
import { studentApi, courseApi } from '../api';

interface Store {
  students: Student[];
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  fetchCourses: () => Promise<void>;
  addStudent: (student: Omit<Student, 'id'>) => Promise<void>;
  addCourse: (course: Omit<Course, 'id'>) => Promise<void>;
  deleteStudent: (id: number) => Promise<void>;
  deleteCourse: (id: number) => Promise<void>;
}

export const useStore = create<Store>((set, get) => ({
  students: [],
  courses: [],
  loading: false,
  error: null,
  
  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const students = await studentApi.getAll();
      set({ students, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch students', loading: false });
    }
  },

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const courses = await courseApi.getAll();
      set({ courses, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch courses', loading: false });
    }
  },

  addStudent: async (student) => {
    set({ loading: true, error: null });
    try {
      const { id } = await studentApi.create(student);
      set(state => ({
        students: [...state.students, { ...student, id }],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add student', loading: false });
    }
  },

  addCourse: async (course) => {
    set({ loading: true, error: null });
    try {
      const { id } = await courseApi.create(course);
      set(state => ({
        courses: [...state.courses, { ...course, id }],
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add course', loading: false });
    }
  },

  deleteStudent: async (id) => {
    set({ loading: true, error: null });
    try {
      await studentApi.delete(id);
      set(state => ({
        students: state.students.filter(s => s.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete student', loading: false });
    }
  },

  deleteCourse: async (id) => {
    set({ loading: true, error: null });
    try {
      await courseApi.delete(id);
      set(state => ({
        courses: state.courses.filter(c => c.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete course', loading: false });
    }
  },
}));