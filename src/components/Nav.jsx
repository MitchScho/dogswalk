/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './Nav.scss';
import { useNavigate, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';

function Nav({ state, setState }) {
  const navigate = useNavigate();
  // console.log('user state', state.user);
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
