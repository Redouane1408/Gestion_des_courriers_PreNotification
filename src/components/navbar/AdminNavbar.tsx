// src/components/navbars/AdminNavbar.tsx
import { Link } from 'react-router-dom';

export default function AdminNavbar() {
  return (
    <nav className="w-64 bg-gray-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
      <ul className="space-y-2 flex-1">
        <li>
          <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">
            User Management
          </Link>
        </li>
      </ul>
      <div className="pt-4 border-t border-gray-700">
        {/* Logout button can go here */}
      </div>
    </nav>
  );
}