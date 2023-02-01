import { useState } from "react";
import axios from 'axios'
//--- Style Imports ---
import './index.scss';

const Register = ({ onFormSwitch }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    console.log("register submit");

    const data = { name, email, pass };

    axios.post("http://localhost:8000/api/register", data).then((res) => {
      console.log("register response", res);
    });
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>
      <form
        className="register-form"
        onSubmit={registerSubmit}
        autoComplete="off"
      >
        <label>name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
          type="text"
          placeholder="Name..."
        />
        <label htmlffor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail....."
          id="email"
          name="email"
        />
        <label htmlffor="password">password</label>
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
      <button className="link-btn" onClick={() => onFormSwitch("login")}>
        Already have an account? Log in here.
      </button>
    </div>
  );
};

export default Register;
