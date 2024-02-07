/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
// --- Router Imports ---
import { NavLink, useNavigate } from 'react-router-dom';
// --- Style Imports ---
import './index.scss';

function Login() {
  const [pass, setPass] = useState('');
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  //----------------------------------------------------------------------------------------
  const loginSubmit = (e) => {
    e.preventDefault();
    const data = { username: userName, password: pass };

    axios.post('http://localhost:8000/api/login', data)

      .then((res) => {
        const { accessToken } = res.data;
        Cookies.set('token', accessToken);

        if (res.data.user.role === 'admin') {
          return navigate('/admin');
        }

        return navigate('/calendar');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //--------------------------------------------------------------------------------------------

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={loginSubmit}>
        <label htmlFor="username">username</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="username"
          placeholder="username....."
          id="username"
          name="username"
        />
        <label htmlFor="password">password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button className="auth-button" type="submit">
          Login
        </button>
      </form>
      <p>
        Don't have an Account?
        <NavLink className="link-btn" to="/auth/register">
          Register here.
        </NavLink>
      </p>
    </div>
  );
}

export default Login;
