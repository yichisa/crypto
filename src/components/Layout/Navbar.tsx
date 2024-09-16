import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between">
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="text-white hover:bg-gray-700 px-4 py-2 rounded">Home</Link>
          </li>
          <li>
            <Link to="/watchlist" className="text-white hover:bg-gray-700 px-4 py-2 rounded">Watchlist</Link>
          </li>
        </ul>
        <ul className="flex space-x-8">
          <li>
            <Link to="/login" className="text-white hover:bg-gray-700 px-4 py-2 rounded">Login</Link>
          </li>
          <li>
            <Link to="/register" className="text-white hover:bg-gray-700 px-4 py-2 rounded">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
