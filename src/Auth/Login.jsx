import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';
import {NavLink, useNavigate} from "react-router-dom";
//--- Style Imports ---
import './index.scss';


const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [userName, setUserName] = useState("");
  
  const navigate = useNavigate();

  const loginSubmit = (e) => {
    e.preventDefault();
    console.log('login submit');
    const data = { username: userName, password: pass };

    axios.post("http://localhost:8000/api/login", data)
      .then((res) => {
        const accessToken = res.data.accessToken;
        Cookies.set("token", accessToken);
        if (accessToken) {
            navigate('/')
        }
      })
      .catch((err) => {
        console.log(err.message);
      })
  };

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
        {/* <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail....."
          id="email"
          name="email"
        /> */}
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
};

export default Login;
