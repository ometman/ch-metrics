import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BookOpen, Users, Layout } from 'lucide-react';
import Home from './components/Home';
import Courses from './components/Courses';
import Students from './components/Students';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <BookOpen className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">Learning Platform</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/dashboard" className="inline-flex items-center px-1 pt-1 text-gray-900">
                    <Layout className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                  <Link to="/courses" className="inline-flex items-center px-1 pt-1 text-gray-900">
                    <BookOpen className="h-4 w-4 mr-1" />
                    Courses
                  </Link>
                  <Link to="/students" className="inline-flex items-center px-1 pt-1 text-gray-900">
                    <Users className="h-4 w-4 mr-1" />
                    Students
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}