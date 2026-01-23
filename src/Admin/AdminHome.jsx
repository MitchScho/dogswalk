/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { Link } from 'react-router-dom';
import './index.scss';

function AdminHome() {
  return (
    <div className="admin-home-container">
      <Link className="admin-home-card" to="/admin/walk-requests"> Walk Requests </Link>
      <Link className="admin-home-card" to="/admin/unpaid-requests"> Unpaid Requests </Link>
      <Link className="admin-home-card" to="/admin/dog-requests"> Dog Requests </Link>
      <Link className="admin-home-card" to="/admin/schedule"> Schedule </Link>
    </div>
  );
}

export default AdminHome;
