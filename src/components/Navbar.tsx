import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ChartBarIcon, PencilSquareIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Church Metrics
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') 
                  ? 'bg-indigo-700 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <HomeIcon className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/input"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/input')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <PencilSquareIcon className="h-5 w-5" />
              <span>Input</span>
            </Link>
            <Link
              to="/reports"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/reports')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
              <span>Reports</span>
            </Link>
            <Link
              to="/admin"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/admin')
                  ? 'bg-indigo-700 text-white'
                  : 'text-indigo-100 hover:bg-indigo-500'
              }`}
            >
              <Cog6ToothIcon className="h-5 w-5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}