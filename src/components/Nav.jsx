import "./Nav.scss";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Nav = ({ state, setState }) => {
  console.log(state.user);
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/auth/login");
    setState((prev) => ({
      ...prev,
      user: null,
    }));
  };

  return (
    <nav>
      <span>DOGSWALK</span>
      {state.user && <Link to="/admin">Admin</Link>}
      {!state.user ? (
        <Link to="/auth/login">Login</Link>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}
      {state.user && <h1>Hi {state.user.username}</h1>}
      {!state.user && <span className="menu"> Menu</span>}
    </nav>
  );
};

export default Nav;
