import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React including components, props, and state.',
    instructor: 'Sarah Johnson',
    duration: '6 weeks',
    students: 234,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=640'
  },
  {
    id: 2,
    title: 'Node.js Fundamentals',
    description: 'Master backend development with Node.js and Express.',
    instructor: 'Michael Chen',
    duration: '8 weeks',
    students: 189,
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=640'
  },
  {
    id: 3,
    title: 'MongoDB Essentials',
    description: 'Learn to work with MongoDB database and perform CRUD operations.',
    instructor: 'David Wilson',
    duration: '4 weeks',
    students: 156,
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=640'
  }
];

function Courses() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Add New Course
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              className="h-48 w-full object-cover"
              src={course.image}
              alt={course.title}
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Duration: {course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{course.students} students enrolled</span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  View Details
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;