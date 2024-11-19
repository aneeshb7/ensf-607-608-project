import { NavLink } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { logout } = useUser(); 
  const navigate = useNavigate();  

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6 px-6 py-4 bg-white shadow-md">
        {/* Logo and Text Section */}
        <NavLink to="/" className="flex items-center space-x-3">
          <img
            alt="logo"
            className="h-12 inline"
            src="/budget_tracker.jpg"
          />
          <span className="text-2xl font-bold text-gray-800">Budget Tracker</span>
        </NavLink>

        {/* Navigation Links */}
        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/budgets"
        >
          Generate Budget
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/create"
        >
          Add Transaction
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/"
        >
          View Transactions
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/create-goal"
        >
          Add Goal
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/goals"
        >
          View Goals
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/chat"
        >
          Chatbot
        </NavLink>

        <NavLink
          className="text-md font-medium text-gray-700 hover:text-blue-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          to="/account"
        >
          My Account
        </NavLink>

        <button
          className="text-md font-medium text-gray-700 hover:text-red-500 transition-colors duration-300 px-4 py-2 rounded-lg focus:outline-none"
          onClick={handleLogout}
        >
          Log out
        </button>
      </nav>
    </div>
  );
}
