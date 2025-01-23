export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar?: string;
  courses?: string[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students?: number;
  image: string;
}

export interface Enrollment {
  student_id: number;
  course_id: number;
  enrollment_date: string;
}