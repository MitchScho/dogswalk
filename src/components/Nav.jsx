import "./Nav.scss";
import { useNavigate } from "react-router-dom";
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
      <button onClick={handleLogout}>Logout</button>
      {state.user?.username && <h1>Hi {state.user.username}</h1>}
    </nav>
  );
};

export default Nav;
