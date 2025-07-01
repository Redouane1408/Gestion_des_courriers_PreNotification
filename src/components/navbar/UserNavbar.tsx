// src/components/navbars/UserNavbar.tsx
import { Link } from 'react-router-dom';

export default function UserNavbar() {
  return (
    <nav className="w-64 bg-blue-800 text-white p-4 flex flex-col">
      <h1 className="text-xl font-bold mb-6">User Panel</h1>
      <ul className="space-y-2 flex-1">
        <li>
          <Link to="/user/dashboard" className="block py-2 px-4 hover:bg-blue-700 rounded">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/user/documents" className="block py-2 px-4 hover:bg-blue-700 rounded">
            My Documents
          </Link>
        </li>
      </ul>
    </nav>
  );
}