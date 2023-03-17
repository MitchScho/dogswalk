import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = ({ state, setState }) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
    setState((prev) => ({
      ...prev,
      user: null,
    }));
  };

  return (
    <nav>
      <span>DOGSWALK</span>
      <Link to="/admin">Admin</Link>
      <Link to="/">Walk Booking Calander</Link>
      <Link to="/auth/login">Login</Link>
      <button onClick={handleLogout}>Logout</button>
      {state.user && <h1>Hi {state.user.username}</h1>}
      <span className="menu"> Menu</span>
    </nav>
  );
};

export default Nav;
