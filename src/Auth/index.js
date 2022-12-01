import Login from "./Login";
import Register from "./Register";
//--- Style Imports ---
import './index.scss';
import {useState} from "react";

const Auth = () => {

  const [currentForm, setCurrentForm] = useState("login")

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="Auth">
      {currentForm === "login" ?
        <Login onFormSwitch={toggleForm}
        /> :
        <Register onFormSwitch={toggleForm}
        />
    }
    </div>
  );
}

export default Auth;