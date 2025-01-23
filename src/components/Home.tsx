import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, Rocket, CheckCircle, Clock } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Master Modern Web Development
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-indigo-100">
              Learn MERN stack development from industry experts. Start your journey to becoming a full-stack developer today.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Browse Courses
              </Link>
              <Link
                to="/students"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to master the MERN stack and build modern web applications
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: BookOpen,
              title: 'Comprehensive Curriculum',
              description: 'Structured learning path covering MongoDB, Express.js, React, and Node.js'
            },
            {
              icon: Users,
              title: 'Expert Instructors',
              description: 'Learn from experienced developers who work with MERN stack daily'
            },
            {
              icon: Award,
              title: 'Certification',
              description: 'Earn certificates upon completion to showcase your expertise'
            },
            {
              icon: Rocket,
              title: 'Hands-on Projects',
              description: 'Build real-world applications throughout the course'
            },
            {
              icon: CheckCircle,
              title: 'Industry-Ready Skills',
              description: 'Learn best practices and modern development workflows'
            },
            {
              icon: Clock,
              title: 'Flexible Learning',
              description: 'Learn at your own pace with lifetime access to course materials'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-medium text-gray-900 text-center">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-600">Start your learning journey today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/courses"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;