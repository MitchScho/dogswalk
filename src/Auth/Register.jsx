/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import axios from 'axios';

// --- Router Imports ---
import { NavLink, useNavigate } from 'react-router-dom';

// --- Style Imports ---
import './index.scss';

function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  //---------------------------------------------------------------------------------------------

  const registerSubmit = (e) => {
    e.preventDefault();

    const data = { userName, email, pass };

    axios.post('http://localhost:8000/api/register', data).then(() => navigate('/auth/login'));
  };

  //----------------------------------------------------------------------------------------------

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form
        className="register-form"
        onSubmit={registerSubmit}
        autoComplete="off"
      >
        <label>username</label>
        <input
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          name="username"
          id="username"
          type="text"
          placeholder="username..."
        />
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail....."
          id="email"
          name="email"
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
          Register
        </button>
      </form>
      <p>
        Already have an account?
        <NavLink className="link-btn" to="/auth/login">
          Login here.
        </NavLink>
      </p>
    </div>
  );
}

export default Register;
