import "./Nav.scss";
import { Link } from "react-router-dom";

const Nav = () => {

  
  return (
    <nav>
      <span>DOGSWALK</span>
      <Link to="/auth/login">Login..</Link>
      <span className="menu"> Menu</span>
    </nav>
  );
};

export default Nav;
