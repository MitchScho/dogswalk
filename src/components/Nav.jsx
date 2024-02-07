/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import Cookies from 'js-cookie';
// --- Style Imports ---
import './Nav.scss';
// --- Router Imports ---
import { useNavigate, NavLink } from 'react-router-dom';

function Nav({ state, setState }) {
  const navigate = useNavigate();

  const admin = state.user.role === 'admin';
  const handleLogout = () => {
    Cookies.remove('token');
    setState((prev) => ({
      ...prev,
      user: null,
    }));
    navigate('/');
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
      {!admin
      && (
      <NavLink className="purple-button" to="/calendar/profile">
        Profile
      </NavLink>
      )}
      <button className="purple-button" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default Nav;
