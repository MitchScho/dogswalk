/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import Cookies from 'js-cookie';
// --- Style Imports ---
import './Nav.scss';
// --- Router Imports ---
import { useNavigate, NavLink } from 'react-router-dom';

function Nav({ state, setState }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const admin = state.user.role === 'admin';
  const handleLogout = () => {
    Cookies.remove('token');
    setState((prev) => ({
      ...prev,
      user: null,
    }));
    navigate('/');
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav>
      <span>DOGSWALK</span>
      {state.user?.username && (
        <h1>
          Hi
          {' '}
          {state.user.username}
        </h1>
      )}
      <div className="nav-buttons">
        {!admin && (
          <NavLink className="purple-button" to="/calendar/profile">
            Profile
          </NavLink>
        )}
        <button className="purple-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <button className="hamburger-menu" onClick={toggleMenu} aria-label="Menu">
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
      </button>
      {menuOpen && (
        <div className="dropdown-menu">
          {!admin && (
            <NavLink
              className="dropdown-item"
              to="/calendar/profile"
              onClick={closeMenu}
            >
              Profile
            </NavLink>
          )}
          <button
            className="dropdown-item"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
