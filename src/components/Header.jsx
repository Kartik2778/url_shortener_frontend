import { Link } from '@mui/icons-material';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../contextApi/UserContext';

const Header = () => {

  const { userData, logout } = useContext(UserContext);

  const handlelogout = () => {
    logout();
  }
  return (
    <nav className="relative z-10 px-6 py-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Link className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            QuickLink
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <NavLink to="/" className="hover:text-purple-300 transition-colors text-white">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-purple-300 transition-colors text-white">
            About
          </NavLink>
          {
            userData != null ? (
              <>
                <NavLink to={`/${userData.roles[0].replace('ROLE_', '')}`} className="hover:text-purple-300 transition-colors text-white">
                  {userData.roles[0] == "ROLE_USER" ? userData.username : "Admin"}
                </NavLink>
                <button  className="hover:text-purple-300 transition-colors text-white" onClick={handlelogout} >Logout</button>
              </>
            )
              :
              (
                <>
                  <NavLink to="/login" className="hover:text-purple-300 transition-colors text-white">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="hover:text-purple-300 transition-colors text-white">
                    Register
                  </NavLink>
                </>
              )
          }

        </div>
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-white hover:text-purple-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;