import Login from "./Login";
import Register from "./Register";
import {
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
// import Cookies from 'js-cookie';
//--- Style Imports ---
import './index.scss';
import {useState} from "react";

const Auth = () => {

  // const [currentForm, setCurrentForm] = useState("login")

  // const toggleForm = (formName) => {
  //   setCurrentForm(formName);
  // };
  // const navigate = useNavigate()

  // const authToken = Cookies.get('token');
  // if (!authToken) {

  //   navigate("/login")
  //   // return (
  //   //   <div className="Auth">
  //   //     <Routes>
  //   //       <Route path = "/login" element = {<Login/>}/>   
  //   //     </Routes>
  //   //   </div>
  //   // )
  // }



  return (
    <div className="Auth">
      <Routes>   
        <Route path="/register" element={<Register />} />
        <Route path = "/login" element ={<Login />}/>  
      </Routes>
    </div>
  );
}

export default Auth;