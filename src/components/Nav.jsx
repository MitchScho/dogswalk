/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './Nav.scss';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Nav({ state, setState }) {
  const navigate = useNavigate();

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
          {state.user.username}
        </h1>
      )}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Nav;
