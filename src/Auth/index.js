import Login from "./Login";
import Register from "./Register";
import {
  Routes,
  Route,
} from "react-router-dom";

//--- Style Imports ---
import './index.scss';


const Auth = () => {


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