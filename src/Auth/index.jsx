/* eslint-disable react/react-in-jsx-scope */
import {
  Routes,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';

// --- Style Imports ---
import './index.scss';

function Auth() {
  return (
    <div className="Auth">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Auth;
