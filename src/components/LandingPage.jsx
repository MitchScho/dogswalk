/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';
import './LandingPage.scss';

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Link className="login-button" to="/auth/login">Login</Link>
      <div>Landing page still to be built</div>
    </div>
  );
}

export default LandingPage;
